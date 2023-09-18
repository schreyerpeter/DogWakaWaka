"use client";
import React, { useEffect, useState } from "react";
import helpers from "@/src/helpers";
import AppointmentCard from "./AppointmentCard";
import useUserState, { useAppointmentsState } from "@/src/hooks/useAppState";
import AppointmentsColumnHeader from "./AppointmentsColumnHeader";

export default function AppointmentsColumn() {
  const { isLoading, isError, user } = useUserState();
  const {
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
    data: dataAppointments = [],
  } = useAppointmentsState();

  const [currentDay, setCurrentDay] = useState(new Date());

  useEffect(
    function () {
      setTimeSlots(helpers.getTimeStampsOfCurrentDayOpenings(currentDay));
    },
    [currentDay]
  );

  const [timeSlots, setTimeSlots] = useState(
    helpers.getTimeStampsOfCurrentDayOpenings(currentDay)
  );

  if (isLoadingAppointments || isLoading) return <div>Loading...</div>;
  if (isError || isErrorAppointments)
    return <div>Failed to load appointments</div>;
  return (
    <>
      <AppointmentsColumnHeader
        setCurrentDay={setCurrentDay}
        currentDay={currentDay}
      />
      <ul role="list" className="w-9/12 sm:w-8/12 md:w-6/12 max-w-400">
        {timeSlots.map(function (timeSlot: string): JSX.Element {
          // Find matching appointment for the current time slot
          const appointment =
            dataAppointments.filter(
              (appointment: AppointmentType) =>
                Date.parse(appointment.startTime) === Date.parse(timeSlot)
            )[0] ?? null;

          return (
            <AppointmentCard
              user={user}
              key={timeSlot}
              timeSlot={timeSlot}
              appointment={appointment}
            />
          );
        })}
      </ul>
    </>
  );
}
