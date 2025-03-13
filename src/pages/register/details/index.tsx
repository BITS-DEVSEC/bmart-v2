import { Box, Flex, Group, Text, Title } from "@mantine/core";
import Logo from "@/assets/image.png";
import Image from "next/image";
import { ContainedInputs } from "@/components/ui/inputs/text";
import CustomButton from "@/components/ui/button";
import { IconArrowBadgeLeft, IconArrowRightDashed } from "@tabler/icons-react";
import { ContainedDates } from "@/components/ui/inputs/date";
import { ContainedSelect } from "@/components/ui/inputs/select";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import { ContainedPassword } from "@/components/ui/inputs/password";
import { useState } from "react";
import { useRegisterMutation } from "@/redux/api/auth";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import Auth from "@/components/layout/auth";

export default function RegisterDetails() {
  const user = useAppSelector((state) => state.user);
  const [register, { isLoading }] = useRegisterMutation();
  const [authOpened, { toggle }] = useDisclosure(false);
  const [business, setBusiness] = useState({
    name: "",
    tin: "",
  });
  const [pin, setPin] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    const res = await register({
      data: {
        user: {
          first_name: user.fullName.split(" ")[0],
          middle_name: user.fullName.split(" ")[1],
          last_name: user.fullName.split(" ")[2],
          phone_number: user.phoneNumber,
          fayda_id: user.fayda,
          password: pin,
          date_of_birth: user.dateOfBirth,
          gender: user.gender.toLowerCase(),
          nationality: user.nationality,
          occupation: "Business Owner",
          source_of_funds: "Business",
          business_name: business.name,
          tin_number: business.tin,
          business_type: "retailer",
        },

        address: {
          address_type: "home",
          city: user.city,
          sub_city: user.subcity,
          woreda: user.woreda,
          latitude: 12.21,
          longitude: 10.11,
        },
      },
    });

    if (res?.data?.success) {
      notifications.show({
        title: "Success",
        message: "Registration successful",
        color: "green",
      });
      toggle();
    } else {
      notifications.show({
        title: "Error",
        message: "Registration failed",
        color: "red",
      });
    }
  }

  return (
    <Box style={{ height: "100vh" }}>
      <Auth alt phone={user.phoneNumber} opened={authOpened} toggle={toggle} />
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
              value={user.fullName}
              label="Full Name"
              placeholder="Enter your full name"
            />
            <Group grow gap="sm">
              <ContainedInputs
                value={user.phoneNumber}
                mt="sm"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <ContainedDates
                value={
                  user.dateOfBirth
                    ? new Date(user.dateOfBirth?.split("T")[0])
                    : undefined
                }
                mt="sm"
                label="Date of Birth"
                placeholder="Enter your date of birth"
              />
            </Group>
            <Group gap="sm" grow mt="sm">
              <ContainedSelect
                value={user.gender}
                placeholder="Select your gender"
                label="Gender"
                data={["Male", "Female"]}
              />
              <ContainedSelect
                value={user.nationality}
                placeholder="Select your nationality"
                label="Nationality"
                data={["Ethiopian", "Foreign"]}
              />
            </Group>
            <Group gap="sm" grow mt="sm">
              <ContainedSelect
                value={user.city}
                placeholder="City"
                label="City"
                data={["Addis Ababa"]}
              />
              <ContainedSelect
                value={user.subcity}
                placeholder="Sub City"
                label="Sub City"
                data={["Bole", "Lemi kura"]}
              />
              <ContainedSelect
                value={user.woreda}
                placeholder="Woreda"
                label="Woreda"
                data={["01", "02", "03", "04", "05", "06", "07", "08"]}
              />
            </Group>
            <Group grow gap="sm">
              <ContainedInputs
                override
                value={business.name}
                mutator={(value: string) =>
                  setBusiness({ ...business, name: value })
                }
                mt="sm"
                label="Business Name"
                placeholder="Enter your business name"
              />
              <ContainedInputs
                override
                value={business.tin}
                mutator={(value: string) =>
                  setBusiness({ ...business, tin: value })
                }
                mt="sm"
                label="TIN"
                placeholder="Enter your TIN"
              />
            </Group>
            <ContainedPassword
              value={pin}
              setValue={setPin}
              label="PIN"
              placeholder="Enter your PIN"
              mt="sm"
            />
          </Box>
          <Box>
            <Group grow gap="sm">
              <CustomButton
                props={{ mt: "sm" }}
                ltr
                altColor
                icon={<IconArrowBadgeLeft size={20} />}
                label="BACK"
                action={() => router.back()}
              />
              <CustomButton
                loading={isLoading}
                action={() => handleSubmit()}
                props={{ mt: "sm" }}
                label="FINISH"
                ltr
                icon={<IconArrowRightDashed size={20} />}
              />
            </Group>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
