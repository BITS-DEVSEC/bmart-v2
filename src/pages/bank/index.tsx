import BasicShell from "@/components/layout/basicShell";
import CustomButton from "@/components/ui/button";
import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Overlay,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRightDashed,
  IconBuildingBank,
  IconGhost,
  IconMoodSmile,
  IconPaywall,
  IconQrcode,
  IconReceipt,
  IconReportMoney,
} from "@tabler/icons-react";
import { useState } from "react";
import BankApplication from "./_bankApplication";
import PaymentQr from "./_paymentQr";
import MakePayment from "./_makePayment";

export default function Bank() {
  const [mask, setMask] = useState(false);
  const [hasBank, setHasBank] = useState(false);
  const [applicationOpened, { toggle: applicationToggle }] =
    useDisclosure(false);
  const [paymentOpened, { toggle: paymentToggle }] = useDisclosure(false);
  const [makePaymentOpened, { toggle: makePaymentToggle }] =
    useDisclosure(false);
  return (
    <BasicShell>
      <BankApplication opened={applicationOpened} toggle={applicationToggle} />
      <PaymentQr opened={paymentOpened} toggle={paymentToggle} />
      <MakePayment opened={makePaymentOpened} toggle={makePaymentToggle} />

      <Card
        style={{ height: "28vh" }}
        radius="md"
        bg="primary.9"
        p="xl"
        withBorder
        shadow="sm"
      >
        {!mask && <Overlay style={{ zIndex: 9 }} blur={8} />}
        <Box
          bg="primary.8"
          opacity={0.56}
          style={{
            width: 20,
            height: 100,
            position: "absolute",
            top: 0,
            left: 40,
          }}
        ></Box>
        <Box
          bg="primary.8"
          opacity={0.56}
          style={{
            width: 40,
            height: 20,
            position: "absolute",
            top: 80,
            left: 0,
          }}
        ></Box>

        <Box
          bg="primary.8"
          opacity={0.56}
          style={{
            width: 20,
            height: 140,
            position: "absolute",
            bottom: 0,
            right: 80,
          }}
        ></Box>
        <Box
          bg="primary.8"
          opacity={0.56}
          style={{
            width: 80,
            height: 20,
            position: "absolute",
            bottom: 120,
            right: 0,
          }}
        ></Box>

        <Box
          bg="primary.8"
          opacity={0.56}
          style={{
            width: 20,
            height: 100,
            position: "absolute",
            bottom: 0,
            right: 40,
          }}
        ></Box>
        <Box
          bg="primary.8"
          opacity={0.56}
          style={{
            width: 40,
            height: 20,
            position: "absolute",
            bottom: 80,
            right: 0,
          }}
        ></Box>

        <Box
          bg="primary.8"
          opacity={0.56}
          style={{
            width: 20,
            height: 140,
            position: "absolute",
            top: 0,
            left: 80,
          }}
        ></Box>
        <Box
          bg="primary.8"
          opacity={0.56}
          style={{
            width: 80,
            height: 20,
            position: "absolute",
            top: 120,
            left: 0,
          }}
        ></Box>
        {hasBank ? (
          <>
            <div style={{ zIndex: 1 }}>
              <Card.Section>
                <Flex gap={6} align="center">
                  <IconBuildingBank color="white" />
                  <Title c="white" order={5}>
                    BANKING DETAILS
                  </Title>
                </Flex>
              </Card.Section>
              <Card.Section>
                <Title c="white" mt={10} order={5}>
                  12345-678-90
                </Title>
                <Title c="white" mt={1} order={3}>
                  NIGUS SOLOMON TAKELE
                </Title>
                <Title
                  style={{ position: "absolute", bottom: 13 }}
                  c="white"
                  order={1}
                >
                  2345.67 <span style={{ fontSize: "0.75rem" }}>ETB</span>
                </Title>
              </Card.Section>
            </div>
            <ActionIcon
              variant="subtle"
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                zIndex: 10,
              }}
              onClick={() => setMask(!mask)}
            >
              {mask ? (
                <IconGhost color="white" />
              ) : (
                <IconMoodSmile color="white" />
              )}
            </ActionIcon>
          </>
        ) : (
          <div style={{ zIndex: 10 }}>
            <CustomButton
              action={() => {
                applicationToggle();
                setHasBank(false);
              }}
              ltr
              props={{ mt: "xl" }}
              label="Apply For Account"
              icon={<IconArrowRightDashed size={20} />}
            />
          </div>
        )}
      </Card>
      <CustomButton
        action={paymentToggle}
        icon={<IconQrcode />}
        ltr
        props={{ mt: "sm" }}
        label="RECIEVE PAYMENT"
      />
      <CustomButton
        action={makePaymentToggle}
        icon={<IconPaywall />}
        altColor
        ltr
        props={{ mt: "sm" }}
        label="MAKE PAYMENT"
      />
      <Flex gap={5} mt={10} align="center">
        <IconReportMoney />
        <Title order={5}>Recent Transactions</Title>
      </Flex>
      {!hasBank ? (
        <ScrollArea pt="sm" type="never" style={{ height: "35vh" }}>
          {[1, 2, 3, 4, 5].map((opt) => (
            <Card mb="sm" withBorder key={opt}>
              <Flex gap={15}>
                <IconReceipt />
                <Flex direction="column" style={{ maxWidth: 170 }}>
                  <Title order={5}>Transfer</Title>
                  <Text size="xs" c="dimmed">
                    Send money to another account, bank or mobile money
                  </Text>
                </Flex>
                <Title
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    padding: "5px 10px",
                  }}
                  order={5}
                >
                  {(200 / opt).toFixed(2)}{" "}
                  <span style={{ fontSize: "0.75rem" }}>ETB</span>
                </Title>
              </Flex>
            </Card>
          ))}
        </ScrollArea>
      ) : (
        <Card withBorder mt="sm">
          <Flex align="center" gap={10}>
            <IconGhost size={100} />
            <Flex direction="column">
              <Title order={4}>No Transactions Found!</Title>
              <Text size="xs" c="dimmed">
                You have not made any transactions yet, please apply for an
                account to start transacting.
              </Text>
            </Flex>
          </Flex>
        </Card>
      )}
    </BasicShell>
  );
}
