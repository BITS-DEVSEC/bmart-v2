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
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowLeftDashed,
  IconArrowRightDashed,
  IconChecks,
  IconUpload,
} from "@tabler/icons-react";
import { useState } from "react";
import { Dropzone } from "@mantine/dropzone";

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
    3: "Identity Documents",
  };
  return (
    <Drawer opened={opened} onClose={toggle} title="Bank Application">
      <Flex direction="column" justify="space-between" h="calc(100vh - 80px)">
        <Box>
          <Flex justify="space-between" align="center">
            <Group>
              {[1, 2, 3].map((opt) => (
                <Box
                  style={{ width: 30, height: 30, borderRadius: 5 }}
                  key={opt}
                  bg={opt == active ? "primary.9" : "gray.5"}
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
                mt="sm"
                label="First Name"
                placeholder="Enter your first name"
              />
              <ContainedInputs
                mt="sm"
                label="Middle Name"
                placeholder="Enter your middle name"
              />
              <ContainedInputs
                mt="sm"
                label="Last Name"
                placeholder="Enter your last name"
              />
              <Group grow>
                <ContainedSelect
                  mt="sm"
                  label="Gender"
                  placeholder="Select your gender"
                  data={["Male", "Female"]}
                />
                <ContainedSelect
                  mt="sm"
                  label="Nationality"
                  placeholder="Select your nationality"
                  data={["Ethiopian", "Foreign"]}
                />
              </Group>
              <ContainedInputs
                mt="sm"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <ContainedInputs
                mt="sm"
                label="Email"
                placeholder="Enter your email"
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
                data={["Bole", "Yeka"]}
              />
              <Group grow>
                <ContainedSelect
                  mt="sm"
                  label="Woreda"
                  placeholder="Select your city"
                  data={["08", "07"]}
                />
                <ContainedSelect
                  mt="sm"
                  label="Kebele"
                  placeholder="Select your city"
                  data={["10", "11"]}
                />
              </Group>
            </>
          )}
          {active == 3 && (
            <>
              <Title mb="xs" order={5}>
                Identification Card
              </Title>
              <Dropzone onDrop={() => {}}>
                <Center>
                  <Flex align="center" direction="column">
                    <IconUpload />
                    <Text mt="xs" fw={700} c="dimmed">
                      UPLOAD
                    </Text>
                  </Flex>
                </Center>
              </Dropzone>
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
          {active < 3 && (
            <CustomButton
              action={() => active < 3 && setActive((prev) => prev + 1)}
              label="Next"
              ltr
              icon={<IconArrowRightDashed size={20} />}
            />
          )}
          {active == 3 && (
            <CustomButton
              action={() => {}}
              label="Submit"
              ltr
              icon={<IconChecks size={20} />}
            />
          )}
        </Flex>
      </Flex>
    </Drawer>
  );
}
