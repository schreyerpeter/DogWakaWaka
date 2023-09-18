"use client";

import Link from "next/link";
import useUser from "@/src/hooks/useAppState";
import UserDropdownOptions from "../molecules/UserDropdownOptions";
import Dropdown from "../atoms/Dropdown";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex flex-1 items-center justify-start sm:items-stretch">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto" src="logo.svg" alt="Wakawakadog" />
              </div>
              <div className=" sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    href="/"
                  >
                    Book a Walk
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3 flex items-center">
                <Dropdown>
                  <UserDropdownOptions />
                </Dropdown>
                <Link href="/profile">
                  <img
                    alt="Profile Pic"
                    src={isLoading ? "" : user?.profileImg}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-start py-12 px-0 md:p-12">
        {children}
      </main>
    </>
  );
}
