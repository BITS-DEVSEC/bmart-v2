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
import { IconChecks, IconMoodSad, IconReceipt } from "@tabler/icons-react";
import { useState } from "react";

export default function Quotations() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { data: quotations, isLoading: fetchingQuotations } =
    useMyQuotationsQuery({});
  const [createOrder, { isLoading: creatingOrder }] = useCreateOrderMutation();
  return (
    <>
      <LoadingOverlay visible={fetchingQuotations} />
      {quotations?.data?.length > 0 &&
        quotations?.data?.map(
          (opt: {
            id: number;
            price: number;
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
                    <Title mt="xs" order={5}>
                      {new Intl.NumberFormat("en-ET", {
                        style: "currency",
                        currency: "ETB",
                      }).format(opt?.price)}
                    </Title>
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
      {quotations?.data?.length == 0 && (
        <Card withBorder>
          <Flex gap={10} align="center">
            <IconMoodSad size={40} />
            <Text>No quotations found</Text>
          </Flex>
        </Card>
      )}
    </>
  );
}
