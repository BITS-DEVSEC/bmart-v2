import CustomButton from "@/components/ui/button";
import { ContainedSelect } from "@/components/ui/inputs/select";
import { ContainedInputs } from "@/components/ui/inputs/text";
import { Modal } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function New({
  type,
  opened,
  toggle,
}: {
  type: string;
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <Modal
      title={`New ${type?.charAt(0).toUpperCase() + type?.slice(1)}`}
      opened={opened}
      onClose={toggle}
    >
      {type == "store" && (
        <>
          <ContainedInputs
            mb="sm"
            label="Store Name"
            placeholder="Eneter the store name"
          />
          <ContainedInputs
            mb="sm"
            label="Store Email"
            placeholder="Eneter the store email"
          />
          <CustomButton
            label="Save"
            ltr
            icon={<IconDeviceFloppy size={20} />}
          />
        </>
      )}

      {type == "inventory" && (
        <>
          <ContainedSelect
            label="Product"
            placeholder="Select a product"
            mb="sm"
          />
          <ContainedInputs
            label="Quantity"
            placeholder="Enter quantity"
            mb="sm"
          />
          <ContainedInputs
            label="Base Price"
            placeholder="Enter base price"
            mb="sm"
          />
          <CustomButton
            label="Save"
            ltr
            icon={<IconDeviceFloppy size={20} />}
          />
        </>
      )}
    </Modal>
  );
}
