import { ActionIcon, Card, Flex, Text, Title } from "@mantine/core";
import { IconCashBanknote, IconReceipt } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import MakePayment from "../bank/_makePayment";

export default function OutgoingOrders() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <MakePayment opened={opened} toggle={toggle} />
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
            <ActionIcon onClick={toggle} variant="transparent">
              <IconCashBanknote />
            </ActionIcon>
          </Flex>
        </Card>
      ))}
    </>
  );
}
