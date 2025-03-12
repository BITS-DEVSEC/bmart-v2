import { Drawer } from "@mantine/core";

export default function Personal({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <Drawer title="Personal Information" opened={opened} onClose={toggle}>
      <></>
    </Drawer>
  );
}
