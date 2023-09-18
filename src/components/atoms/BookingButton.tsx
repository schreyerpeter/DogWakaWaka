"use client";

import { useAppointmentsState } from "@/src/hooks/useAppState";
import BasicButton from "./BasicButton";
import Dropdown from "./Dropdown";
import ClientApiProvider from "@/src/providers/api_provider";
import DogDropdownOptions from "../molecules/DogDropdownOptions";

// **************************************************************************
// Scenarios:
// 1. Appointment is available (null appointment for that timeslot)
//   1a. User has no dogs (disabled button)
//   1b. User has one dog (no dropdown, just button that adds appointment for the dog)
//   1c. User has multiple dogs (dropdown choosing which dog)
// 2. Appointment is booked by current user (appointment is not null and client is current user => cancel button)
// 3. Appointment is booked by another user or edge case (appointment is not null and client is not current user => disabled button)
// **************************************************************************
export default function BookingButton({
  appointment,
  appointmentIsAvailable,
  appointmentIsBookedByCurrentUser,
  timeSlot,
  user,
}: {
  appointment?: AppointmentType;
  appointmentIsAvailable: boolean;
  appointmentIsBookedByCurrentUser: boolean;
  timeSlot: string;
  user: UserType;
}) {
  const { mutate, data } = useAppointmentsState();
  const usersDogs = user?.dogs ?? [];

  if (appointmentIsAvailable) {
    switch (usersDogs.length) {
      case 0:
        return (
          <BasicButton theme="grey" disabled>
            No dogs to book
          </BasicButton>
        );
      case 1:
        return (
          <BasicButton
            theme="blue"
            onClick={async () => {
              const appointment: AppointmentType | null =
                await ClientApiProvider.createAppointment({
                  startTime: timeSlot,
                  client: user,
                  dog: usersDogs[0],
                });
              if (appointment != null) mutate(data.concat(appointment));
            }}
          >
            Book
          </BasicButton>
        );
      default:
        return (
          <Dropdown dropdownText="book">
            <DogDropdownOptions dogs={usersDogs} timeSlot={timeSlot} />
          </Dropdown>
        );
    }
  }
  if (appointmentIsBookedByCurrentUser && appointment != null)
    return (
      <BasicButton
        theme="white"
        onClick={async () => {
          const deletedAppointment: AppointmentType | null =
            await ClientApiProvider.deleteAppointment({ appointment });
          if (deletedAppointment != null)
            mutate(
              data.filter(
                (apt: AppointmentType) => apt._id != deletedAppointment._id
              )
            );
        }}
      >
        Cancel
      </BasicButton>
    );
  // appointment is booked by other user or edge case
  return (
    <BasicButton theme="grey" disabled>
      Booked
    </BasicButton>
  );
}
