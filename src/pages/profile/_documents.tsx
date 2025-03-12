import { Drawer } from "@mantine/core";

export default function Documents({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <Drawer title="Uploaded Documents" opened={opened} onClose={toggle}>
      <></>
    </Drawer>
  );
}
