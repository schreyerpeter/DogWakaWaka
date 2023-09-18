import ClientApiProvider from "@/src/providers/api_provider";
import BasicButton from "../atoms/BasicButton";
import useAppState from "@/src/hooks/useAppState";

function DogCard({ dog }: { dog: DogType }) {
  const { mutate, user, isLoading } = useAppState();
  if (isLoading) return <div>...</div>;
  return (
    <article className="rounded-xl border border-gray-700 bg-gray-800 p-4 mt-4">
      <div className="flex items-center gap-4">
        <img
          alt="Derpy Dog"
          src={dog.profileImg}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-medium text-white">{dog.name}</h3>
          <h4 className="text-sm font-medium text-white">Breed: {dog.breed}</h4>
        </div>
        <BasicButton
          onClick={async () => {
            const deletedDog: DogType | null =
              await ClientApiProvider.deleteDog({ dog, user });
            if (deletedDog) {
              mutate(
                user.dogs.filter((dog: DogType) => dog._id !== deletedDog._id)
              );
            }
          }}
          theme="white"
        >
          Remove
        </BasicButton>
      </div>
    </article>
  );
}

export default DogCard;
