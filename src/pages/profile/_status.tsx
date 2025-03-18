import {
  Avatar,
  Badge,
  Divider,
  Flex,
  Modal,
  Text,
  Title,
} from "@mantine/core";

export default function ProfileStatus({
  opened,
  toggle,
  userProfile,
}: {
  opened: boolean;
  toggle: () => void;
  userProfile: {
    data: {
      first_name: string;
      middle_name: string;
      last_name: string;
      phone_number: string;
      date_of_birth: string;
      gender: string;
      nationality: string;
      kyc_status: string;
      created_at: string;
      fayda_id: string;
    };
  };
}) {

  const statusColors = {
    pending: "orange",
    approved: "green",
    rejected: "red",
    null: "orange",
  };
  return (
    <Modal opened={opened} onClose={toggle} title="Profile Status">
      <Flex align="center" gap={13}>
        <Avatar
          color="primary.9"
          variant="filled"
          size="md"
          radius="xs"
          name={
            userProfile?.data?.first_name + " " + userProfile?.data?.last_name
          }
        />
        <Flex direction="column">
          <Title order={5}>
            {userProfile?.data?.first_name} {userProfile?.data?.middle_name}{" "}
            {userProfile?.data?.last_name}
          </Title>
          <Text size="xs" c="dimmed">
            +251{userProfile?.data?.phone_number?.slice(1)}
          </Text>
        </Flex>
      </Flex>
      <Divider h={2} my="xs" />
      <Flex justify="space-between" align="center">
        <Text fw={700}>Verification Status</Text>
        <Badge
          radius="sm"
          color={
            statusColors[
              userProfile?.data?.kyc_status as keyof typeof statusColors
            ]
          }
        >
          {userProfile?.data?.kyc_status || "PENDING"}
        </Badge>
      </Flex>
    </Modal>
  );
}
