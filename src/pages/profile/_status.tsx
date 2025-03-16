import { useAuth } from "@/context/auth";
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
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const { user } = useAuth();
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
      <Divider h={2} my="xs" />
      <Flex justify="space-between" align="center">
        <Text fw={700}>Verification Status</Text>
        <Badge
          radius="sm"
          color={statusColors[user?.kyc_status as keyof typeof statusColors]}
        >
          {user?.kyc_status || "PENDING"}
        </Badge>
      </Flex>
    </Modal>
  );
}
