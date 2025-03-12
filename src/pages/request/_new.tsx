import CustomButton from "@/components/ui/button";
import { ContainedDates } from "@/components/ui/inputs/date";
import { ContainedSelect } from "@/components/ui/inputs/select";
import { ContainedInputs } from "@/components/ui/inputs/text";
import { ContainedInputAreas } from "@/components/ui/inputs/textarea";
import { Group } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";

export default function NewRequest() {
  return (
    <>
      <ContainedSelect
        data={["Item 1", "Item 2", "Item 3"]}
        mb="sm"
        label="Product"
        placeholder="Enter product name"
      />
      <ContainedDates
        mb="sm"
        label="Delivery Date"
        placeholder="Enter delivery date"
      />
      <Group grow>
        <ContainedInputs mb="sm" label="Quantity" placeholder="Quantity" />
        <ContainedSelect mb="sm" label="Unit" placeholder="Unit" />
      </Group>
      <ContainedInputAreas
        minr={4}
        mb="sm"
        label="Notes"
        placeholder="Enter notes"
      />
      <CustomButton
        ltr
        icon={<IconChecks size={20} />}
        label="PUBLISH REQUEST"
      />
    </>
  );
}
