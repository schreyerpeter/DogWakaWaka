"use client";

import BasicButton from "../atoms/BasicButton";
import useUserState, { useAppointmentsState } from "@/src/hooks/useAppState";
import ClientApiProvider from "@/src/providers/api_provider";
import { Menu } from "@headlessui/react";

export default function DogDropdownOptions({
  dogs = [],
  timeSlot,
}: {
  dogs: DogType[] | undefined;
  timeSlot: string;
}) {
  const { user } = useUserState();
  const { mutate, data } = useAppointmentsState();
  return (
    <>
      {dogs.map((dog: DogType) => (
        <Menu.Item key={dog._id}>
          {({ active }) => (
            <BasicButton
              className={`${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              } block px-4 py-2 text-sm`}
              theme="grey"
              onClick={async () => {
                const appointment: AppointmentType | null =
                  await ClientApiProvider.createAppointment({
                    startTime: timeSlot,
                    client: user,
                    dog: dog,
                  });
                if (appointment) mutate(data.concat(appointment));
              }}
            >
              {dog.name}
            </BasicButton>
          )}
        </Menu.Item>
      ))}
    </>
  );
}
