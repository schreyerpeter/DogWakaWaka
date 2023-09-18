import Modal from "../atoms/Modal";
import EditUserDetailsForm from "./EditUserDetailsForm";

function EditUserDetailsModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <Modal
      title="Update your details"
      subtitle="Keep your contact information up to date"
      open={open}
      setOpen={setOpen}
    >
      <EditUserDetailsForm onComplete={() => setOpen(false)} />
    </Modal>
  );
}

export default EditUserDetailsModal;
