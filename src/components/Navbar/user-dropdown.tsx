import { Fragment } from "react";

import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";

import { useLogout } from "hooks/use-logout";
import { useAuth } from "hooks/use-auth";
import { useNavigate } from "react-router-dom";

export const UserDropdown = () => {
  const { userData } = useAuth();

  const navigate = useNavigate();
  const logout = useLogout();

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
        <div className="w-8 h-8 overflow-hidden rounded-full">
          <img src={userData?.profilePicture} alt="user" />
        </div>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <MenuItems className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            <div>
              <span className="flex items-center w-full px-2 py-2 text-sm text-gray-900 rounded-md group">
                {`${userData?.firstName} ${userData?.lastName}`}
              </span>
              <span className="flex items-center w-full px-2 py-2 text-sm text-gray-500 rounded-md group">
                {userData?.email}
              </span>
            </div>
          </div>
          <div className="p-1">
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-700 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => {
                    navigate(`/profile/${userData?.id}`);
                  }}
                >
                  Profile
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-700 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => {
                    navigate("/settings");
                  }}
                >
                  Settings
                </button>
              )}
            </MenuItem>
          </div>
          <div className="p-1">
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-700 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
