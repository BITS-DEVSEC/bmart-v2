import CustomButton from "@/components/ui/button";
import { ContainedInputs } from "@/components/ui/inputs/text";
import { AspectRatio, Box, Flex, Modal, ScrollArea, Text } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useCreateQuotationsMutation } from "@/redux/api/requests";
import { notifications } from "@mantine/notifications";

export default function DetailsR({
  title,
  opened,
  toggle,
  product,
}: {
  title?: string | undefined;
  opened: boolean;
  toggle: () => void;
  product?: {
    id: number;
    notes: string;
    product: { name: string; description: string; image_urls: string[] };
  };
}) {
  const [amount, setAmount] = useState<string>("");
  const { user } = useAuth();
  const [createQuotation, { isLoading: isCreating }] =
    useCreateQuotationsMutation();
  return (
    <Modal title={title || "Product Details"} opened={opened} onClose={toggle}>
      <ScrollArea type="never">
        <Flex gap={10}>
          {product?.product?.image_urls?.map((url: string) => (
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
        {product?.notes}
      </Text>
      <ContainedInputs
        value={amount}
        setValue={setAmount}
        mt="xs"
        mb="xs"
        label="Price Amount"
        placeholder="Enter the price amount for your quotation..."
      />
      <CustomButton
        loading={isCreating}
        action={async () => {
          const res = await createQuotation({
            price: Number(amount),
            item_request_id: product?.id,
            seller_id: user?.id,
          });

          if (res?.data?.success) {
            notifications.show({
              title: "Success",
              message: "Quotation created successfully",
              color: "green",
            });
          } else {
            notifications.show({
              title: "Error",
              message: "Quotation creation failed",
              color: "red",
            });
          }
        }}
        label="Qoute"
        ltr
        icon={<IconSend size={20} />}
      />
    </Modal>
  );
}
