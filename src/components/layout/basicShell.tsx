import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Card,
  Center,
  Flex,
  Group,
  Indicator,
  SegmentedControl,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconAffiliate,
  IconBuilding,
  IconWallet,
  IconBuildingStore,
  IconReceipt,
  IconSearch,
  IconShoppingCart,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import LogoAlt from "@/assets/imageClear.png";
import { useDisclosure } from "@mantine/hooks";
import Cart from "./cart";
import Auth from "./auth";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toSell, toBuy } from "@/redux/state/userType";

export default function BasicShell({
  children,
  alt,
  noSell,
  noSearch,
}: {
  children: React.ReactNode;
  alt?: boolean;
  noSell?: boolean;
  noSearch?: boolean;
}) {
  const userType = useAppSelector((state) => state.userType.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const activePath = router.pathname;
  const [opened, { toggle }] = useDisclosure();
  const [authOpened, { toggle: toggleAuth }] = useDisclosure();
  const [triggeredRoute, setTriggerRoute] = useState<string>();
  const { isAuthenticated, user } = useAuth();

  return (
    <AppShell
      header={{ height: alt ? (noSearch ? 60 : 120) : 0 }}
      footer={{ height: 80 }}
      padding="md"
    >
      <Cart opened={opened} toggle={toggle} />
      <Auth
        triggerRoute={triggeredRoute}
        opened={authOpened}
        toggle={toggleAuth}
      />
      {alt && (
        <AppShell.Header style={{ border: 0 }}>
          <Group grow align="center" h={noSearch ? "100%" : "50%"} px="md">
            <Box style={{ zIndex: -1 }}>
              <Image
                onClick={() => router.push("/")}
                style={{ zIndex: -1 }}
                src={LogoAlt.src}
                alt="Logo"
                width={110}
                height={50}
              />
            </Box>
            {!noSell ? (
              <SegmentedControl
                color="primary.9"
                fullWidth
                size="xs"
                value={userType}
                data={["BUY", "SELL"]}
                onChange={(value) => {
                  dispatch(value == "SELL" ? toSell() : toBuy());
                }}
              />
            ) : (
              <Flex justify="flex-end">
                <Avatar
                  onClick={() => router.push("/profile")}
                  variant="filled"
                  color="primary"
                  radius="md"
                  name={
                    isAuthenticated
                      ? user?.first_name + " " + user?.last_name
                      : ""
                  }
                />
              </Flex>
            )}
          </Group>
          <Group pt="sm" pb="md" align="center" h="50%" px="md">
            {!noSearch && (
              <TextInput
                rightSection={<IconSearch size={20} />}
                placeholder="Search..."
                size="md"
                radius="md"
                style={{ flex: 1 }}
              />
            )}
            <Indicator
              display="none"
              radius={2}
              size={15}
              offset={5}
              label="5"
              color="red"
            >
              <ActionIcon
                variant="subtle"
                onClick={isAuthenticated ? toggle : toggleAuth}
                size="xl"
              >
                <IconShoppingCart size={23} />
              </ActionIcon>
            </Indicator>
          </Group>
        </AppShell.Header>
      )}

      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer style={{ border: 0 }}>
        <Card radius="md" mx="md" withBorder p={7}>
          <SimpleGrid spacing="xs" verticalSpacing="xs" cols={5}>
            {[
              {
                title: "Market",
                icon: (
                  <IconBuildingStore
                    color={activePath == "/" ? "white" : "black"}
                    size={25}
                  />
                ),
                path: "/",
              },
              {
                title: "Requests",
                icon: (
                  <IconAffiliate
                    color={activePath == "/request" ? "white" : "black"}
                    size={25}
                  />
                ),
                path: "/request",
              },
              {
                title: "Orders",
                icon: (
                  <IconReceipt
                    color={activePath == "/orders" ? "white" : "black"}
                    size={25}
                  />
                ),
                path: "/orders",
              },
              {
                title: "Store",
                icon: (
                  <IconBuilding
                    color={activePath == "/store" ? "white" : "black"}
                    size={25}
                  />
                ),
                path: "/store",
              },
              {
                title: "Bank",
                icon: (
                  <IconWallet
                    color={activePath == "/bank" ? "white" : "black"}
                    size={25}
                  />
                ),
                path: "/bank",
              },
            ].map((opt) => (
              <Center key={opt.title}>
                <Box
                  variant="subtle"
                  onClick={() => {
                    const paths = ["/store", "/request", "/bank", "/orders"];
                    if (paths.includes(opt.path) && !isAuthenticated) {
                      setTriggerRoute(opt.path);
                      toggleAuth();
                      return;
                    }
                    router.push(opt.path);
                  }}
                  bg={activePath == opt.path ? "primary" : "dark-1"}
                  style={{ height: 50, width: 56, borderRadius: 5 }}
                >
                  <Flex direction="column">
                    <Center h={38}>{opt.icon}</Center>
                    <Text
                      ta="center"
                      c={activePath == opt.path ? "white" : "black"}
                      style={{ fontSize: 10 }}
                      mt={-6}
                    >
                      {opt.title}
                    </Text>
                  </Flex>
                </Box>
              </Center>
            ))}
          </SimpleGrid>
        </Card>
      </AppShell.Footer>
    </AppShell>
  );
}
