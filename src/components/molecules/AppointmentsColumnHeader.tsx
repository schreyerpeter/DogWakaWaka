import BasicButton from "../atoms/BasicButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function AppointmentsColumnHeader({
  currentDay,
  setCurrentDay,
}: {
  currentDay: Date;
  setCurrentDay: Function;
}) {
  return (
    <div className="relative flex h-16 items-center justify-between">
      <BasicButton
        onClick={() => {
          setCurrentDay(new Date(currentDay.getTime() - 24 * 60 * 60 * 1000));
        }}
        theme="grey"
        className="mr-5"
      >
        <ChevronLeftIcon
          className="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </BasicButton>
      <h3>
        {currentDay.toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </h3>
      <BasicButton
        onClick={async () => {
          setCurrentDay(new Date(currentDay.getTime() + 24 * 60 * 60 * 1000));
        }}
        theme="grey"
        className="ml-5"
      >
        <ChevronRightIcon
          className="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </BasicButton>
    </div>
  );
}
