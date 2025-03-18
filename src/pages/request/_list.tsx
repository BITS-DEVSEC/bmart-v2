import { Card, Flex, LoadingOverlay, Text, Title } from "@mantine/core";
import { IconMoodSad, IconReceipt } from "@tabler/icons-react";
import { useState } from "react";
import DetailsR from "./_details";
import { useDisclosure } from "@mantine/hooks";

export default function ListRequest({
  requests,
  fetchingRequests,
}: {
  requests: {
    data: {
      name: string;
      description: string;
      quantity: number;
      notes: string;
      unit: string;
      product: { name: string; image_urls: string[] };
    }[];
  };
  fetchingRequests: boolean;
}) {
  const [opened, { toggle }] = useDisclosure(false);
  const [activeRequest, setActiveRequest] = useState<{
    name: string;
    description: string;
    quantity: number;
    unit: string;
    image_urls: string[];
  }>();
  return (
    <>
      <DetailsR opened={opened} toggle={toggle} request={activeRequest} />
      <LoadingOverlay visible={fetchingRequests} />
      {requests?.data?.length > 0 &&
        requests?.data?.map(
          (opt: {
            notes: string;
            quantity: number;
            unit: string;
            product: { name: string; image_urls: string[] };
          }) => (
            <Card
              onClick={() => {
                toggle();
                setActiveRequest({
                  name: opt?.product?.name,
                  description: opt?.notes,
                  quantity: opt?.quantity,
                  unit: opt?.unit,
                  image_urls: opt?.product?.image_urls,
                });
              }}
              mb="sm"
              withBorder
              key={opt.notes}
            >
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
      {requests?.data?.length == 0 && (
        <Card withBorder>
          <Flex gap={10} align="center">
            <IconMoodSad size={40} />
            <Text>No published requests</Text>
          </Flex>
        </Card>
      )}
    </>
  );
}
