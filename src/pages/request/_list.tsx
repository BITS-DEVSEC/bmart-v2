import { useMyRequestsQuery } from "@/redux/api/requests";
import { Card, Flex, Text, Title } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";

export default function ListRequest() {
  const { data: requests } = useMyRequestsQuery({});
  return (
    <>
      {requests?.data?.map(
        (opt: {
          notes: string;
          products: { name: string; quantity: number }[];
        }) => (
          <Card mb="sm" withBorder key={opt.notes}>
            <Flex gap={15}>
              <IconReceipt />
              <Flex direction="column">
                <Title order={5}>Transfer</Title>
                <Text size="xs" c="dimmed">
                  {opt.notes}
                </Text>
              </Flex>
            </Flex>
          </Card>
        )
      )}
    </>
  );
}
