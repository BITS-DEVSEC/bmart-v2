import { Modal, Text, Title } from "@mantine/core";

export default function DetailsR({
  opened,
  toggle,
  request,
}: {
  opened: boolean;
  toggle: () => void;
  request:
    | {
        name: string;
        description: string;
        quantity: number;
        unit: string;
      }
    | undefined;
}) {
  return (
    <Modal title={request?.name} opened={opened} onClose={toggle}>
      <Text c="dimmed">{request?.description}</Text>
      <Title order={5}>
        {request?.quantity} {request?.unit}
      </Title>
    </Modal>
  );
}
