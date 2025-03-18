import { AspectRatio, Box, Flex, Modal, ScrollArea, Text } from "@mantine/core";
import Image from "next/image";

export default function DetailsP({
  title,
  opened,
  toggle,
  product,
}: {
  title?: string | undefined;
  opened: boolean;
  toggle: () => void;
  product?: {
    name: string;
    description: string;
    image_urls: string[];
  };
}) {
  return (
    <Modal title={title || "Product Details"} opened={opened} onClose={toggle}>
      <ScrollArea type="never">
        <Flex gap={10}>
          {product?.image_urls?.map((url: string) => (
            <Box key={url} style={{ width: "100%" }}>
              <AspectRatio key={url} ratio={1}>
                <Image
                  alt="product image"
                  src={`https://snf.bitscollege.edu.et/${url}` || ""}
                  width={1000}
                  height={800}
                />
              </AspectRatio>
            </Box>
          ))}
        </Flex>
      </ScrollArea>
      <Text c="dimmed" size="xs">
        {product?.description}
      </Text>
    </Modal>
  );
}
