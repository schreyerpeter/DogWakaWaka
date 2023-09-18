import BookingButton from "../atoms/BookingButton";

function AppointmentCard({
  timeSlot,
  appointment,
  user,
}: {
  timeSlot: string;
  appointment?: AppointmentType;
  user: UserType;
}) {
  const timeSlotDate = new Date(timeSlot);
  const appointmentIsAvailable = appointment == null;
  const appointmentIsBookedByCurrentUser =
    !appointmentIsAvailable && appointment?.client._id == user?._id;
  return (
    <li className="rounded-xl border border-gray-700 bg-gray-800 p-4 mt-4">
      <div className="min-w-300">
        <div className="flex flex-wrap items-center gap-4">
          <h3 className="text-lg font-medium text-white flex-1">
            {timeSlotDate.getHours() < 13
              ? `${timeSlotDate.getHours()} AM`
              : `${timeSlotDate.getHours() - 12} PM`}
          </h3>
          <BookingButton
            appointmentIsAvailable={appointmentIsAvailable}
            appointmentIsBookedByCurrentUser={appointmentIsBookedByCurrentUser}
            appointment={appointment}
            timeSlot={timeSlot}
            user={user}
          />
        </div>
        {appointmentIsBookedByCurrentUser && (
          <div className="flex items-center justify-around flex-wrap gap-4">
            <img
              alt="Derpy Dog"
              src={appointment?.dog?.profileImg}
              className="h-16 w-16 rounded-full object-cover "
            />
            <h3 className="text-lg font-medium text-white">
              Your dog {appointment?.dog?.name} is booked for a walk!
            </h3>
          </div>
        )}
      </div>
    </li>
  );
}

export default AppointmentCard;
