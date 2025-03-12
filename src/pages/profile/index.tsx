import BasicShell from "@/components/layout/basicShell";
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  NavLink,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBuilding,
  IconChevronRight,
  IconFlagQuestion,
  IconInfoHexagon,
  IconLock,
  IconLogout,
  IconPhoneCall,
  IconProgress,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import ProfileStatus from "./_status";
import { useDisclosure } from "@mantine/hooks";
import Personal from "./_personal";
import Business from "./_business";
import FAQ from "./_faq";

export default function Profile() {
  const [profileStatusOpened, { toggle: toggleProfileStatus }] =
    useDisclosure(false);
  const [personalOpened, { toggle: togglePersonal }] = useDisclosure(false);
  const [businessOpened, { toggle: toggleBusiness }] = useDisclosure(false);
  const [faqOpened, { toggle: toggleFaq }] = useDisclosure(false);
  const supportphone = "0978616116";

  return (
    <BasicShell>
      <ProfileStatus
        opened={profileStatusOpened}
        toggle={toggleProfileStatus}
      />
      <Personal opened={personalOpened} toggle={togglePersonal} />
      <Business opened={businessOpened} toggle={toggleBusiness} />
      <FAQ opened={faqOpened} toggle={toggleFaq} />
      <Card withBorder p="xs">
        <Flex justify="space-between" gap={20} align="center">
          <Flex gap={10} align="center">
            <Avatar size="md" radius="sm" name="Nigus Solomon" />
            <Flex direction="column">
              <Title order={5}>Nigus Solomon Takele</Title>
              <Text size="xs" c="dimmed">
                +251 978 61 61 16
              </Text>
            </Flex>
          </Flex>
          <ActionIcon color="red" variant="subtle">
            <IconLogout size={20} />
          </ActionIcon>
        </Flex>
      </Card>
      <Flex
        justify="space-between"
        h={"calc(100vh - 175px)"}
        direction="column"
      >
        <Box>
          <Flex justify="space-between" mt="md" align="center">
            <Title order={5}>Profile Infomration</Title>
            <IconUser size={16} />
          </Flex>
          <SimpleGrid
            mt="xs"
            verticalSpacing={0}
            style={{ border: "1px solid #DEDEDE", borderRadius: 5 }}
            cols={1}
          >
            <NavLink
              onClick={toggleProfileStatus}
              style={{ borderRadius: 5 }}
              leftSection={<IconProgress size={18} />}
              rightSection={<IconInfoHexagon color="white" size={20} />}
              color="green"
              active
              variant="filled"
              label="Profile Status"
            />
            <NavLink
              onClick={togglePersonal}
              style={{ borderRadius: 5 }}
              leftSection={<IconUser size={18} />}
              rightSection={<IconChevronRight size={18} />}
              color="primary"
              label="Personal Information"
            />
            <Divider />
            <NavLink
              onClick={toggleBusiness}
              style={{ borderRadius: 5 }}
              leftSection={<IconBuilding size={18} />}
              rightSection={<IconChevronRight size={18} />}
              color="primary"
              label="Business Information"
            />
            <Divider />
          </SimpleGrid>
        </Box>
        <Box>
          <Flex justify="space-between" align="center" mt="md">
            <Title order={5}>Settings</Title>
            <IconSettings size={16} />
          </Flex>
          <SimpleGrid
            mt="xs"
            verticalSpacing={0}
            style={{ border: "1px solid #DEDEDE", borderRadius: 5 }}
            cols={1}
          >
            <NavLink
              style={{ borderRadius: 5 }}
              leftSection={<IconLock size={18} />}
              rightSection={<IconChevronRight size={18} />}
              variant="filled"
              label="Change Password"
            />
            <Divider />
            <NavLink
              onClick={toggleFaq}
              style={{ borderRadius: 5 }}
              leftSection={<IconFlagQuestion size={18} />}
              rightSection={<IconChevronRight size={18} />}
              variant="filled"
              label="FAQ"
            />
            <Divider />
            <NavLink
              component="a"
              href={`tel:${supportphone}`}
              style={{ borderRadius: 5 }}
              leftSection={<IconPhoneCall size={18} />}
              variant="filled"
              label="Call Support"
            />
          </SimpleGrid>
        </Box>
      </Flex>
    </BasicShell>
  );
}
