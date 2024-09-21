import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAuth } from "hooks/use-auth";

import { Container, Spinner, Box } from "components/ui";
import { FormField } from "components/form/form-field";
import { EditUserSchema } from "components/form/user-schema";
import { FormFieldVariant, type FormData } from "components/form/types"
;
import { axiosPrivate } from "api/axios";
import { dataURLtoFile, resizeFile } from "utils/file-utils";

import { ImageCropper } from "./image-cropper";

const EDIT_USER_URL = "/users";

export const SettingsPage = () => {
  const { userData, setUserData } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(EditUserSchema),
  });

  const { email, firstName, lastName } = watch();

  const isFormEmpty = !email && !firstName && !lastName;
  const isNewAvatarAdded = avatar !== userData?.profilePicture;
  const disableSaveButton = isSaving || (isFormEmpty && !isNewAvatarAdded);

  useEffect(() => {
    if (userData?.profilePicture) {
      setAvatar(userData?.profilePicture);
    }
  }, [setAvatar, userData?.profilePicture]);

  if (!userData) {
    return <Spinner />;
  }

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      if (isNewAvatarAdded) {
        const fileObj = dataURLtoFile(avatar, "avatar.jpg");
        const resizedFile = await resizeFile(fileObj)

        formData.append("file", resizedFile);
      }
      if (data.email) {
        formData.append("email", data.email);
      }
      if (data.firstName) {
        formData.append("firstName", data.firstName);
      }
      if (data.lastName) {
        formData.append("lastName", data.lastName);
      }

      setIsSaving(true);

      const response = await toast.promise(
        axiosPrivate.patch(EDIT_USER_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          pending: "Saving...",
          success: "Profile has been saved!",
          error:
            "There has been a problem with saving your profile. Try again later!",
        }
      );

      const newUserData = response.data
      setUserData(newUserData);
      setIsSaving(false);
      reset()
    } catch (err: unknown) {
        setIsSaving(false);
    }
  };
  return (
    <Container className="flex-col max-w-screen-xl px-4">
      <Box>
        <h3 className="flex justify-center mb-2 text-3xl font-semibold leading-normal text-center">
          Edit profile
        </h3>
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-col items-center justify-center w-full px-4 lg:w-3/12 lg:order-1">
            <div className="w-40 h-40 overflow-hidden rounded-full shadow-xl">
              <img src={avatar} alt="user" />
            </div>
            <button
              className="px-4 py-2 my-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              Change avatar
            </button>
          </div>
          <div className="w-full px-4 lg:w-4/12 lg:order-2">
            <div className="mt-6 text-center">
              <form
                className="flex flex-col gap-5 bg-gray-900"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormField
                  type="text"
                  placeholder={userData.email}
                  name="email"
                  register={register}
                  error={errors.email}
                  label="Email"
                  variant={FormFieldVariant.Dark}
                />
                <FormField
                  type="text"
                  placeholder={userData.firstName}
                  name="firstName"
                  register={register}
                  error={errors.firstName}
                  label="First Name"
                  variant={FormFieldVariant.Dark}
                />
                <FormField
                  type="text"
                  placeholder={userData.lastName}
                  name="lastName"
                  register={register}
                  error={errors.lastName}
                  label="Last Name"
                  variant={FormFieldVariant.Dark}
                />
                <button
                  type="submit"
                  disabled={disableSaveButton}
                  className="px-4 py-2 my-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </Box>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-800/50" />
        <div className="fixed inset-0 w-screen p-4 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <DialogPanel className="flex flex-col w-full max-w-lg min-w-0 p-12 px-6 py-4 space-y-4 text-white bg-gray-900 rounded-lg drop-shadow-lg">
              <DialogTitle className="font-bold">Change avatar</DialogTitle>
              <div>
                <ImageCropper
                  updateAvatar={setAvatar}
                  handleClose={() => setIsOpen(false)}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Container>
  );
};
