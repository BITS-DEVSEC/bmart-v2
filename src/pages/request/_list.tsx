import { useMyRequestsQuery } from "@/redux/api/requests";
import { Card, Flex, LoadingOverlay, Text, Title } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";

export default function ListRequest() {
  const { data: requests, isLoading: fetchingRequests } = useMyRequestsQuery(
    {}
  );
  return (
    <>
      <LoadingOverlay visible={fetchingRequests} />
      {requests?.data?.map(
        (opt: {
          notes: string;
          product: { name: string; quantity: number };
        }) => (
          <Card mb="sm" withBorder key={opt.notes}>
            <Flex gap={15}>
              <IconReceipt />
              <Flex direction="column">
                <Title order={5}>{opt?.product?.name}</Title>
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
