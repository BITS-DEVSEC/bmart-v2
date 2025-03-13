import { ActionIcon, Card, Flex, Text, Title } from "@mantine/core";
import { IconChecks, IconReceipt } from "@tabler/icons-react";

export default function Quotations() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((opt) => (
        <Card mb="sm" withBorder key={opt}>
          <Flex justify="space-between" align="center">
            <Flex gap={15}>
              <IconReceipt />
              <Flex direction="column" style={{ maxWidth: 170 }}>
                <Title order={5}>Transfer</Title>
                <Text size="xs" c="dimmed">
                  Send money to another account, bank or mobile money
                </Text>
              </Flex>
            </Flex>
            <ActionIcon variant="transparent">
              <IconChecks />
            </ActionIcon>
          </Flex>
        </Card>
      ))}
    </>
  );
}
