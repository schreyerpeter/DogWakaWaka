"use client";

import useUserState from "@/src/hooks/useAppState";
import DogCard from "./DogCard";

function DogsList() {
  const { user, isLoading, isError } = useUserState();
  const { dogs = [] } = user;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load dogs</div>;
  if (dogs.length === 0) return <div>No dogs yet</div>;

  return (
    <div className="flex items-center space-x-4 flex-wrap">
      {dogs.map((dog: DogType) => (
        <DogCard key={dog._id} dog={dog} />
      ))}
    </div>
  );
}

export default DogsList;
