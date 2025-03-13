import { Box, Flex, Group, Text, Title } from "@mantine/core";
import Logo from "@/assets/image.png";
import Image from "next/image";
import { ContainedInputs } from "@/components/ui/inputs/text";
import CustomButton from "@/components/ui/button";
import { IconArrowBadgeLeft, IconArrowRightDashed } from "@tabler/icons-react";
import { ContainedDates } from "@/components/ui/inputs/date";
import { ContainedSelect } from "@/components/ui/inputs/select";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";

export default function RegisterDetails() {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <Box style={{ height: "100vh" }}>
      <Box style={{ height: "30vh" }} bg="primary">
        <Flex justify="center" align="center" direction="column" pt="xl">
          <Image width={200} height={200} src={Logo.src} alt="Logo" />
          <Text c="white" mt={10} ta="center" size="xs" px="xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            repellendus! Debitis consectetur inventore cumque iste odit.
          </Text>
        </Flex>
      </Box>
      <Box style={{ height: "70vh" }} p="md">
        <Flex direction="column" justify="space-between" h="66vh">
          <Box>
            <Title order={5} mb="xs">
              Registration Details
            </Title>
            <ContainedInputs
              label="Full Name"
              placeholder="Enter your full name"
            />
            <ContainedInputs
              mt="sm"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <ContainedDates
              mt="sm"
              label="Date of Birth"
              placeholder="Enter your date of birth"
            />
            <Group gap="sm" grow mt="sm">
              <ContainedSelect
                placeholder="Select your gender"
                label="Gender"
                data={["Male", "Female"]}
              />
              <ContainedSelect
                placeholder="Select your nationality"
                label="Nationality"
                data={["Ethiopian", "Foreign"]}
              />
            </Group>
            <Group gap="sm" grow mt="sm">
              <ContainedSelect placeholder="City" label="City" data={["AA"]} />
              <ContainedSelect
                placeholder="Sub City"
                label="Sub City"
                data={["Bole"]}
              />
              <ContainedSelect
                placeholder="Woreda"
                label="Woreda"
                data={["01", "02", "03", "04", "05", "06", "07", "08"]}
              />
            </Group>
          </Box>
          <Box>
            <CustomButton
              action={() => login("0978616161", "123456")}
              props={{ mt: "sm" }}
              label="FINISH"
              ltr
              icon={<IconArrowRightDashed size={20} />}
            />
            <CustomButton
              props={{ mt: "sm" }}
              ltr
              altColor
              icon={<IconArrowBadgeLeft size={20} />}
              label="BACK"
              action={() => router.back()}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
