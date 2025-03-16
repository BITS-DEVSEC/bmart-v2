import {
  useCreateOrderMutation,
  useMyQuotationsQuery,
} from "@/redux/api/quotations";
import {
  ActionIcon,
  Card,
  Flex,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconChecks, IconReceipt } from "@tabler/icons-react";
import { useState } from "react";

export default function Quotations() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { data: quotations, isLoading: fetchingQuotations } =
    useMyQuotationsQuery({});
  const [createOrder, { isLoading: creatingOrder }] = useCreateOrderMutation();
  return (
    <>
      <LoadingOverlay visible={fetchingQuotations} />
      {quotations?.data?.map(
        (opt: {
          id: number;
          item_request: { product: { name: string; description: string } };
        }) => (
          <Card mb="sm" withBorder key={opt?.item_request?.product?.name}>
            <Flex justify="space-between" align="center">
              <Flex gap={15}>
                <IconReceipt />
                <Flex direction="column" style={{ maxWidth: 170 }}>
                  <Title order={5}>{opt?.item_request?.product?.name}</Title>
                  <Text lineClamp={2} size="xs" c="dimmed">
                    {opt?.item_request?.product?.description}
                  </Text>
                </Flex>
              </Flex>
              <ActionIcon
                onClick={async () => {
                  setActiveId(opt?.id);
                  const res = await createOrder({
                    quotation_id: opt?.id,
                  });

                  if (res?.data?.success) {
                    notifications.show({
                      title: "Success",
                      message: "Order created successfully",
                      color: "green",
                    });
                  } else {
                    notifications.show({
                      title: "Error",
                      message: "Order creation failed",
                      color: "red",
                    });
                  }
                }}
                loading={activeId == opt?.id && creatingOrder}
                variant="transparent"
              >
                <IconChecks />
              </ActionIcon>
            </Flex>
          </Card>
        )
      )}
    </>
  );
}
