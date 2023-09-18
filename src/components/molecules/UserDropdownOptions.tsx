"use client";

import BasicButton from "../atoms/BasicButton";
import useUserState from "@/src/hooks/useAppState";
import { Menu } from "@headlessui/react";

export default function UserDropdownOptions() {
  const { mutate, allUsers = [], isLoading } = useUserState();
  if (isLoading) return <div>...</div>;
  return allUsers.map((user: UserType) => (
    <Menu.Item key={user._id}>
      {({ active }) => (
        <BasicButton
          className={`${
            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
          } block px-4 py-2 text-sm`}
          theme="grey"
          onClick={() => {
            if (user != null) {
              // setActiveUserId(user._id);
              // This is broken! No time left to debug.
            }
          }}
        >
          {user.firstName} {user.lastName}
        </BasicButton>
      )}
    </Menu.Item>
  ));
}
