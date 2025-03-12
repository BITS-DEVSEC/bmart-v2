import Auth from "@/components/layout/auth";
import CustomButton from "@/components/ui/button";
import { ContainedSelect } from "@/components/ui/inputs/select";
import { ContainedInputs } from "@/components/ui/inputs/text";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCashBanknote } from "@tabler/icons-react";

export default function MakePayment({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const [authOpened, { toggle: authToggle }] = useDisclosure(false);

  return (
    <>
      <Auth alt opened={authOpened} toggle={authToggle} />
      <Modal title="Make Payment" opened={opened} onClose={toggle}>
        <ContainedSelect
          label="From Account"
          placeholder="Choose your account"
        />
        <ContainedInputs
          mt="xs"
          label="To Account"
          placeholder="Choose your account"
        />
        <ContainedInputs mt="xs" label="Amount" placeholder="amount" />
        <CustomButton
          action={() => {
            toggle();
            authToggle();
          }}
          props={{ mt: "xs" }}
          label="Make Payment"
          ltr
          icon={<IconCashBanknote size={20} />}
        />
      </Modal>
    </>
  );
}
