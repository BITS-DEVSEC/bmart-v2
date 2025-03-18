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
  IconChevronRight,
  IconFlagQuestion,
  IconInfoHexagon,
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
import { useAuth } from "@/context/auth";
import { useProfileQuery } from "@/redux/api/auth";

export default function Profile() {
  const [profileStatusOpened, { toggle: toggleProfileStatus }] =
    useDisclosure(false);
  const [personalOpened, { toggle: togglePersonal }] = useDisclosure(false);
  const [businessOpened, { toggle: toggleBusiness }] = useDisclosure(false);
  const [faqOpened, { toggle: toggleFaq }] = useDisclosure(false);
  const supportphone = "8501";
  const { data: userProfile, refetch: profileRefetch } = useProfileQuery({});

  console.log(userProfile);

  const { logout, user } = useAuth();
  const statusColors = {
    pending: "orange",
    approved: "green",
    rejected: "red",
    null: "orange",
  };

  return (
    <BasicShell refresh={() => profileRefetch()}>
      <ProfileStatus
        userProfile={userProfile}
        opened={profileStatusOpened}
        toggle={toggleProfileStatus}
      />
      <Personal
        userProfile={userProfile}
        opened={personalOpened}
        toggle={togglePersonal}
      />
      <Business opened={businessOpened} toggle={toggleBusiness} />
      <FAQ opened={faqOpened} toggle={toggleFaq} />
      <Card withBorder p="xs">
        <Flex justify="space-between" gap={20} align="center">
          <Flex gap={10} align="center">
            <Avatar
              variant="filled"
              color="primary"
              size="md"
              radius="sm"
              name={user?.first_name + " " + user?.last_name}
            />
            <Flex direction="column">
              <Title order={5}>
                {user?.first_name} {user?.middle_name} {user?.last_name}
              </Title>
              <Text size="xs" c="dimmed">
                +251{user?.phone_number?.slice(1)}
              </Text>
            </Flex>
          </Flex>
          <ActionIcon onClick={logout} color="red" variant="subtle">
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
              color={
                statusColors[
                  userProfile?.data?.kyc_status as keyof typeof statusColors
                ]
              }
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
