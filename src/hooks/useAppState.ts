import useSWR, { Fetcher } from "swr";
import ClientApiService from "../services/api_service";
import { useEffect, useState } from "react";

export default function useAppState() {
  const fetcher: Fetcher<UserType[], string> = () =>
    ClientApiService.getUsers();
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);
  // Toggle [0] and [1] to see the different users
  const user =
    data?.[1] ??
    <UserType>{
      _id: "1234567890",
      firstName: "Peter",
      lastName: "Schreyer",
      address: "123 Main St",
      dogs: <DogType[]>[],
    };
  // This is super janky. TODO: add ability to login or change user
  // const [activeUserId, setActiveUserId] = useState("");
  // useEffect(() => {
  //   if (isLoading || error) return;

  //   if (data && data?.length > 0) {
  //     setActiveUserId(activeUserId ?? data[0]._id);
  //     const user = data.find((u: UserType) => u._id == activeUserId);
  //     mutate(
  //       data
  //         .filter((u: UserType) => u._id != user?._id)
  //         .unshift(user ?? <UserType>{})
  //     );
  //   }
  // }, [isLoading || activeUserId]);

  return {
    allUsers: data,
    user: user, // data?.find((u: UserType) => u._id == activeUserId) ?? <UserType>{},
    isLoading,
    isError: error,
    mutate,
    // setActiveUserId,
  };
}

export function useAppointmentsState() {
  const fetcher: Fetcher<AppointmentType[], string> = () =>
    ClientApiService.getAppointments();
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/api/appointments", fetcher);

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useDogsState() {
  const fetcher: Fetcher<DogType[], string> = () => ClientApiService.getDogs();
  const { data, error, isLoading } = useSWR("/api/dogs", fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
