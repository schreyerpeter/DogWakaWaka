"use client";

import useUserState from "@/src/hooks/useAppState";

function UserDetailsGrid() {
  const { user } = useUserState();
  return (
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm dark:border-gray-700">
      <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">Name</dt>
          <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
            {user?.firstName} {user?.lastName}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">Address</dt>
          <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
            {user?.address}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default UserDetailsGrid;
