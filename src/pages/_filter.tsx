import CustomButton from "@/components/ui/button";
import { ContainedSelect } from "@/components/ui/inputs/select";
import { Group, Modal } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

export default function FilterOptions({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <Modal opened={opened} onClose={toggle} title="Filter Options">
      <ContainedSelect mb="sm" label="Category" placeholder="Category" />
      <Group grow gap="sm">
        <ContainedSelect label="Min Price" placeholder="Min Price" />
        <ContainedSelect label="Max Price" placeholder="Max Price" />
      </Group>
      <CustomButton
        action={toggle}
        props={{ mt: "xs" }}
        label="Filter"
        ltr
        icon={<IconFilter size={20} />}
      />
    </Modal>
  );
}
