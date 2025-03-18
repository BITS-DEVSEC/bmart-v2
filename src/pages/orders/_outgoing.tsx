import {
  ActionIcon,
  Card,
  Flex,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCashBanknote,
  IconMoodSad,
  IconReceipt,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import MakePayment from "../bank/_makePayment";
import { useMyOrdersQuery } from "@/redux/api/quotations";
import { usePayMutation } from "@/redux/api/virtual_acc";
import { notifications } from "@mantine/notifications";

export default function OutgoingOrders() {
  const [opened, { toggle }] = useDisclosure();
  const [pay, { isLoading: paying }] = usePayMutation();
  const { data: orders } = useMyOrdersQuery({});
  return (
    <>
      <MakePayment opened={opened} toggle={toggle} />
      {orders?.order_items?.map(
        (opt: {
          id: number;
          order_id: number;
          unit_price: number;
          quantity: number;
          product: {
            id: number;
            order_id: number;
            name: string;
            description: string;
          };
        }) => (
          <Card mb="sm" withBorder key={opt.id}>
            <LoadingOverlay visible={paying} />
            <Flex justify="space-between" align="center">
              <Flex gap={15}>
                <IconReceipt />
                <Flex direction="column" style={{ maxWidth: 170 }}>
                  <Title order={5}>{opt?.product?.name}</Title>
                  <Text lineClamp={2} size="xs" c="dimmed">
                    {opt.product?.description}
                  </Text>
                  <Title mt="xs" order={5}>
                    {new Intl.NumberFormat("en-ET", {
                      style: "currency",
                      currency: "ETB",
                    }).format(opt?.unit_price * opt?.quantity)}
                  </Title>
                </Flex>
              </Flex>
              <ActionIcon
                onClick={async () => {
                  const res = await pay({
                    order_id: opt?.order_id,
                  });
                  if (res?.data?.data) {
                    notifications.show({
                      title: "Success",
                      message: "Payment successful",
                      color: "green",
                    });
                  } else {
                    notifications.show({
                      title: "Error",
                      message: "Payment failed",
                      color: "red",
                    });
                  }
                }}
                variant="transparent"
              >
                <IconCashBanknote />
              </ActionIcon>
            </Flex>
          </Card>
        )
      )}
      {orders?.order_items?.length == 0 && (
        <Card withBorder>
          <Flex gap={10} align="center">
            <IconMoodSad size={40} />
            <Text>No active orders found</Text>
          </Flex>
        </Card>
      )}
    </>
  );
}
