import BasicShell from "@/components/layout/basicShell";
import CustomButton from "@/components/ui/button";
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Center,
  Flex,
  Group,
  LoadingOverlay,
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
import { useAuth } from "@/context/auth";
import {
  useHasAccountQuery,
  useVirtualAccDetailsQuery,
} from "@/redux/api/virtual_acc";

export default function Bank() {
  const [mask, setMask] = useState(false);
  const { user } = useAuth();
  const { data: hasBank, isLoading } = useHasAccountQuery(
    user?.id?.toString() || ""
  );
  const [applicationOpened, { toggle: applicationToggle }] =
    useDisclosure(false);
  const [paymentOpened, { toggle: paymentToggle }] = useDisclosure(false);
  const [makePaymentOpened, { toggle: makePaymentToggle }] =
    useDisclosure(false);
  const { data: vc } = useVirtualAccDetailsQuery({});

  return (
    <BasicShell noSell alt noSearch>
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
        {hasBank?.has_virtual_account && hasBank?.status !== "pending" ? (
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
                  {vc?.data?.account_number}
                </Title>
                <Title c="white" mt={1} order={3}>
                  {user?.first_name} {user?.middle_name} {user?.last_name}
                </Title>
                <Title
                  style={{ position: "absolute", bottom: 13 }}
                  c="white"
                  order={1}
                >
                  {vc?.data?.balance}{" "}
                  <span style={{ fontSize: "0.75rem" }}>ETB</span>
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
        ) : isLoading ? (
          <LoadingOverlay
            overlayProps={{
              backgroundOpacity: 0.23,
              blur: 4,
            }}
            visible={isLoading}
          />
        ) : (
          <div style={{ zIndex: 10 }}>
            {!hasBank?.has_virtual_account && hasBank?.status !== "pending" ? (
              <CustomButton
                action={() => {
                  applicationToggle();
                }}
                ltr
                props={{ mt: "xl" }}
                label="Apply For Account"
                icon={<IconArrowRightDashed size={20} />}
              />
            ) : (
              <Center>
                <Badge color="orange" style={{ zIndex: 10 }}>
                  WAITING FOR VERIFICATION
                </Badge>
              </Center>
            )}
          </div>
        )}
      </Card>
      {hasBank?.has_virtual_account && hasBank?.status !== "pending" && (
        <Group gap={15} grow>
          <CustomButton
            action={paymentToggle}
            icon={<IconQrcode />}
            ltr
            props={{ mt: "sm" }}
            label="RECIEVE"
          />
          <CustomButton
            action={makePaymentToggle}
            icon={<IconPaywall />}
            altColor
            ltr
            props={{ mt: "sm" }}
            label="PAY"
          />
        </Group>
      )}
      <Flex gap={5} mt={10} justify="space-between" align="center">
        <Title order={5}>Recent Transactions</Title>
        <IconReportMoney size={16} />
      </Flex>
      {hasBank?.has_virtual_account && hasBank?.status !== "pending" ? (
        <ScrollArea pt="sm" type="never" style={{ height: "35.5vh" }}>
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
