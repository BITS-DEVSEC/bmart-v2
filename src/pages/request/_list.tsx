import { Card, Flex, Text, Title } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";

export default function ListRequest() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((opt) => (
        <Card mb="sm" withBorder key={opt}>
          <Flex gap={15}>
            <IconReceipt />
            <Flex direction="column">
              <Title order={5}>Transfer</Title>
              <Text size="xs" c="dimmed">
                Send money to another account, bank or mobile money
              </Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </>
  );
}
