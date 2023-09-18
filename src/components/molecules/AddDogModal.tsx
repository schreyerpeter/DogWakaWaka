import Modal from "../atoms/Modal";
import AddDogForm from "./AddDogForm";

function AddDogModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <Modal
      title="Add a new dog"
      subtitle="Introduce us to your buddy!"
      open={open}
      setOpen={setOpen}
    >
      <AddDogForm onComplete={() => setOpen(false)} />
    </Modal>
  );
}

export default AddDogModal;
