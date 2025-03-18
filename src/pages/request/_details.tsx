import { AspectRatio, Modal, Text, Title } from "@mantine/core";
import Image from "next/image";

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
        image_urls: string[];
      }
    | undefined;
}) {
  return (
    <Modal title={request?.name} opened={opened} onClose={toggle}>
      <AspectRatio ratio={1}>
        <Image
          src={`https://snf.bitscollege.edu.et/${request?.image_urls[0]}`}
          alt="product image"
          width={400}
          height={400}
        />
      </AspectRatio>
      <Text size="xs" c="dimmed">
        {request?.description}
      </Text>
      <Title mt={10} order={5}>
        {request?.quantity} {request?.unit}
      </Title>
    </Modal>
  );
}
