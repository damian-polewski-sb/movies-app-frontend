import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'

import { User } from 'context/authContext'
 
interface UserDropdownProps {
    user: User
}

export const UserDropdown = ({
    user
 }: UserDropdownProps) => (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img src={user.profilePicture} alt="user" />    
                </div>
            </Menu.Button>
            
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-1">
                        <div>
                            <span className='flex items-center w-full px-2 py-2 text-sm text-gray-900 rounded-md group'>{user.name}</span>
                            <span className='flex items-center w-full px-2 py-2 text-sm text-gray-500 rounded-md group'>{user.email}</span>
                        </div>
                    </div>
                    <div className="p-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-blue-700 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Profile
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-blue-700 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Settings
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="p-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-blue-700 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )