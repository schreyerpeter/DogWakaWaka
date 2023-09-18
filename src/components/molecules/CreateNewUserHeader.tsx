"use client";

import ClientApiProvider from "@/src/providers/api_provider";
import BasicButton from "../atoms/BasicButton";
import useUserState from "@/src/hooks/useAppState";

export default function CreateNewUserHeader() {
  const { mutate, allUsers = [] } = useUserState();
  return (
    <header>
      <div className="w-screen max-w-screen-xl px-4 py-2 sm:px-6 sm:py-2 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-end">
          <BasicButton
            onClick={async () => {
              const createdUser: UserType | null =
                await ClientApiProvider.createUser();
              console.log(createdUser);
              if (createdUser != null) mutate(allUsers.concat(createdUser));
            }}
            theme="white"
          >
            Create User +
          </BasicButton>
        </div>
      </div>
    </header>
  );
}
