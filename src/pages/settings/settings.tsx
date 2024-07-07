import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

import { useAuth } from "hooks/use-auth";

import { Container } from "components/ui/container";
import { Spinner } from "components/ui/spinner";
import { ImageCropper } from "./image-cropper";

export const SettingsPage = () => {
  const { userData } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (userData?.profilePicture) {
      setAvatar(userData?.profilePicture);
    }
  }, [userData?.profilePicture]);

  if (!userData) {
    return <Spinner />;
  }

  return (
    <Container className="flex flex-col max-w-screen-xl px-4">
      <div className="flex flex-col w-full min-w-0 px-6 py-4 text-white bg-gray-900 rounded-lg drop-shadow-lg">
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
              <h3 className="mb-2 text-4xl font-semibold leading-normal text-blueGray-700">
                {`${userData.firstName} ${userData.lastName}`}
              </h3>
            </div>
          </div>
        </div>
      </div>
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
