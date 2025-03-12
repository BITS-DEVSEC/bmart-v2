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
  return (
    <Modal opened={opened} onClose={toggle} title="Profile Status">
      <Flex align="center" gap={10}>
        <Avatar
          color="primary.9"
          variant="filled"
          size="lg"
          radius="xs"
          name="Nigus Solomon"
        />
        <Flex direction="column">
          <Title order={5}>Nigus Solomon Takele</Title>
          <Text size="xs" c="dimmed">
            +251 978 61 61 16
          </Text>
        </Flex>
      </Flex>
      <Divider h={2} my="xs" />
      <Flex justify="space-between" align="center">
        <Text fw={700}>Verification Status</Text>
        <Badge radius="sm" color="green">
          VERFIED
        </Badge>
      </Flex>
    </Modal>
  );
}
