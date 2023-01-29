import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Logout from "components/Logout";

const Header: FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="bg-white shadow dark:bg-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <h1 className="transform text-2xl font-bold text-gray-800 transition-colors duration-200 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl">
                Ally
              </h1>
            </div>
          </div>

          <div>
            {isAuthenticated ? (
              <div className="flex-1 md:flex md:items-center md:justify-between">
                <div className="-mx-4 flex flex-col md:mx-8 md:flex-row md:items-center">
                  <a
                    href="/"
                    className="mx-2 mt-2 transform rounded-md px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 md:mt-0"
                  >
                    探す
                  </a>
                  <a
                    href="#"
                    className="mx-2 mt-2 transform rounded-md px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 md:mt-0"
                  >
                    プロフィール
                  </a>
                  <a
                    href="#"
                    className="mx-2 mt-2 transform rounded-md px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 md:mt-0"
                  >
                    <Logout />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex-1 md:flex md:items-center md:justify-between">
                <div className="-mx-4 flex flex-col md:mx-8 md:flex-row md:items-center">
                  <a
                    href="#"
                    className="mx-2 mt-2 transform rounded-md px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 md:mt-0"
                  >
                    ホーム
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
