import BasicButton from "../atoms/BasicButton";

function UserDetailsHeader({ onEdit }: { onEdit: () => void }) {
  return (
    <header>
      <div className="w-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Personal Details
          </h1>

          <BasicButton onClick={onEdit} theme="white">
            Edit
          </BasicButton>
        </div>
      </div>
    </header>
  );
}

export default UserDetailsHeader;
