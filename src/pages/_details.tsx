import { Modal } from "@mantine/core";

export default function DetailsP({
  title,
  opened,
  toggle,
}: {
  title?: string | undefined;
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <Modal title={title || "Product Details"} opened={opened} onClose={toggle}>
      <></>
    </Modal>
  );
}
