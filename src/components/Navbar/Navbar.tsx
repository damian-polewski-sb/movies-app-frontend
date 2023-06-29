import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext } from 'react'

import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {

    const { currentUser } = useContext(AuthContext)

    const UserDropdown = () => {
        return (
            <Menu as="div">
                <Menu.Button className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                        <img src={currentUser?.profilePicture} alt="user" />    
                    </div>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <span className='flex items-center w-full px-2 py-2 text-sm text-gray-900 rounded-md group'>{currentUser?.name}</span>
                            </Menu.Item>
                            <Menu.Item>
                                <span className='flex items-center w-full px-2 py-2 text-sm text-gray-500 rounded-md group'>{currentUser?.email}</span>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
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
                                        Notifications
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
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
    }

    return (
        <nav className="sticky top-0 bg-gray-900 border-gray-200">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                <Link to='/home' className="flex items-center">
                    <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">Movies App</span>
                </Link>
                <div className="flex items-center gap-4 text-white md:order-2">
                    <NotificationsIcon />
                    <UserDropdown />
                    <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon />
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-blue-950 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/home" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
                        </li>
                        <li>
                            <a href="/profile/1" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
                        </li>
                        <li>
                            <a href="/browse" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Browse</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar