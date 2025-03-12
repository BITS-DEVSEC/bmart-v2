import { Drawer } from "@mantine/core";

export default function Business({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <Drawer title="Business Information" opened={opened} onClose={toggle}>
      <></>
    </Drawer>
  );
}
