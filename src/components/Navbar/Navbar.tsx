import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

import { UserDropdown } from "components/navbar/user-dropdown";
import { NotificationsSummary } from "components/navbar/notifications-summary";

import { useAuth } from "hooks/use-auth";

export const Navbar = () => {
  const { auth } = useAuth();

  const linkClasses = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
      <div className="flex flex-wrap items-center justify-between max-w-screen-lg p-4 mx-auto">
        <Link to="/home" className="flex items-center">
          <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">
            Movies App
          </span>
        </Link>
        <div className="flex items-center gap-4 text-white md:order-2">
          {auth && (
            <>
              <NotificationsSummary />
              <UserDropdown />
            </>
          )}
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon />
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-blue-950 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/home" className={linkClasses}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile/1" className={linkClasses}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/browse" className={linkClasses}>
                Browse
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
