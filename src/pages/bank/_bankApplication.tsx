import CustomButton from "@/components/ui/button";
import { ContainedSelect } from "@/components/ui/inputs/select";
import { ContainedInputs } from "@/components/ui/inputs/text";
import {
  Box,
  Center,
  Divider,
  Drawer,
  Flex,
  Group,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowLeftDashed,
  IconArrowRightDashed,
  IconChecks,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useCreateVirtualAccMutation } from "@/redux/api/virtual_acc";
import { notifications } from "@mantine/notifications";

export default function BankApplication({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const [active, setActive] = useState(1);
  const formTitles = {
    1: "Personal Details",
    2: "Address Details",
  };
  const { user } = useAuth();
  const [createVirtualAcc, { isLoading: isCreatingVirtualAcc }] =
    useCreateVirtualAccMutation();
  return (
    <Drawer opened={opened} onClose={toggle} title="Bank Application">
      <LoadingOverlay visible={isCreatingVirtualAcc} />
      <Flex direction="column" justify="space-between" h="calc(100vh - 80px)">
        <Box>
          <Flex justify="space-between" align="center">
            <Group>
              {[1, 2].map((opt) => (
                <Box
                  onClick={() => setActive(opt)}
                  style={{ width: 30, height: 30, borderRadius: 5 }}
                  key={opt}
                  bg={opt == active ? "primary.9" : "gray.1"}
                >
                  <Center h={30}>
                    <Text c={opt == active ? "white" : "dark"}>{opt}</Text>
                  </Center>
                </Box>
              ))}
            </Group>
            <Title order={5}>
              {formTitles[active as keyof typeof formTitles]}
            </Title>
          </Flex>
          <Divider my="xs" />
          {active == 1 && (
            <>
              <ContainedInputs
                value={user?.first_name}
                mt="sm"
                label="First Name"
                placeholder="Enter your first name"
              />
              <ContainedInputs
                value={user?.middle_name}
                mt="sm"
                label="Middle Name"
                placeholder="Enter your middle name"
              />
              <ContainedInputs
                value={user?.last_name}
                mt="sm"
                label="Last Name"
                placeholder="Enter your last name"
              />
              <Group grow>
                <ContainedSelect
                  value={
                    user?.gender
                      ? user?.gender?.charAt(0).toUpperCase() +
                        user?.gender?.slice(1)
                      : ""
                  }
                  mt="sm"
                  label="Gender"
                  placeholder="Select your gender"
                  data={["Male", "Female"]}
                />
                <ContainedSelect
                  value={user?.nationality}
                  mt="sm"
                  label="Nationality"
                  placeholder="Select your nationality"
                  data={["Ethiopian", "Foreign"]}
                />
              </Group>
              <ContainedInputs
                value={user?.phone_number}
                mt="sm"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
            </>
          )}

          {active == 2 && (
            <>
              <ContainedSelect
                mt="sm"
                label="City"
                placeholder="Select your city"
                data={["Addis Ababa"]}
              />
              <ContainedSelect
                mt="sm"
                label="Sub City"
                placeholder="Select your city"
                data={["Bole", "Lemi kura"]}
              />
              <Group grow>
                <ContainedSelect
                  mt="sm"
                  label="Woreda"
                  placeholder="Select your city"
                  data={["01", "02", "03", "04", "05", "06", "07", "08"]}
                />
              </Group>
            </>
          )}
        </Box>
        <Flex gap={10}>
          {active > 1 && (
            <CustomButton
              action={() => active > 1 && setActive((prev) => prev - 1)}
              label="Back"
              altColor
              rtl
              icon={<IconArrowLeftDashed size={20} />}
            />
          )}
          {active < 2 && (
            <CustomButton
              action={() => active < 3 && setActive((prev) => prev + 1)}
              label="Next"
              ltr
              icon={<IconArrowRightDashed size={20} />}
            />
          )}
          {active == 2 && (
            <CustomButton
              action={async () => {
                const res = await createVirtualAcc({
                  user_id: user?.id,
                  branch_code: "001",
                  product_scheme: "savings",
                  voucher_type: "standard",
                  balance: 1000,
                  interest_rate: 2.5,
                  interest_type: "annual",
                  active: true,
                  status: 0,
                });
                if (res?.data?.success) {
                  notifications.show({
                    title: "Success",
                    message: "Virtual account created successfully",
                    color: "green",
                  });
                } else {
                  notifications.show({
                    title: "Error",
                    message: "Virtual account creation failed",
                    color: "red",
                  });
                }
              }}
              label="Apply"
              ltr
              icon={<IconChecks size={20} />}
            />
          )}
        </Flex>
      </Flex>
    </Drawer>
  );
}
