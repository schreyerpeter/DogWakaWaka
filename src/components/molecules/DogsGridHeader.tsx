import BasicButton from "../atoms/BasicButton";

function DogsListHeader({ onRemove }: { onRemove: () => void }) {
  return (
    <header>
      <div className="w-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Your Dogs
          </h1>

          <BasicButton onClick={onRemove} theme="blue">
            New Dog
          </BasicButton>
        </div>
      </div>
    </header>
  );
}

export default DogsListHeader;
