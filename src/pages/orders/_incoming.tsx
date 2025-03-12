import { ActionIcon, Card, Flex, Text, Title } from "@mantine/core";
import { IconQrcode, IconReceipt } from "@tabler/icons-react";
import PaymentQr from "../bank/_paymentQr";
import { useDisclosure } from "@mantine/hooks";

export default function IncomingOrders() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <PaymentQr opened={opened} toggle={toggle} />
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
              <IconQrcode />
            </ActionIcon>
          </Flex>
        </Card>
      ))}
    </>
  );
}
