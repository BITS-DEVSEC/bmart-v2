import BasicShell from "@/components/layout/basicShell";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Chip,
  Flex,
  LoadingOverlay,
  ScrollArea,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Logo from "@/assets/cardbg.svg";
import { IconCheck, IconShoppingBagPlus } from "@tabler/icons-react";
import FilterOptions from "./_filter";
import { useDisclosure } from "@mantine/hooks";
import {
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/products";
import { useAppSelector } from "@/redux/hooks";
import { useGetRequestsQuery } from "@/redux/api/requests";

export default function Home() {
  const userType = useAppSelector((state) => state.userType.value);
  const [filterOpened, { toggle: filterToggle }] = useDisclosure();
  const { data: products, isLoading } = useGetProductsQuery({});
  const { data: categories } = useGetProductCategoriesQuery({});
  const { data: requests } = useGetRequestsQuery({});
  console.log(products);
  return (
    <BasicShell alt>
      <LoadingOverlay visible={isLoading} />
      {userType === "BUY" && (
        <>
          <FilterOptions opened={filterOpened} toggle={filterToggle} />
          <Flex gap={10}>
            <ScrollArea type="never" style={{ height: "5vh" }}>
              <Flex gap={10} align="center">
                {categories?.data?.map((opt: { name: string }) => (
                  <Chip variant="light" radius="sm" key={opt.name}>
                    {opt?.name?.charAt(0)?.toUpperCase() + opt?.name?.slice(1)}
                  </Chip>
                ))}
              </Flex>
            </ScrollArea>
          </Flex>
          <ScrollArea type="never" style={{ height: "calc(100vh - 272px)" }}>
            <SimpleGrid mb="sm" cols={2}>
              {products?.data?.map(
                (opt: {
                  name: string;
                  description: string;
                  base_price: number;
                }) => (
                  <Card withBorder shadow="sm" key={opt.name}>
                    <Card.Section>
                      <Image
                        src={Logo.src}
                        alt="Logo"
                        width={200}
                        height={200}
                      />
                    </Card.Section>
                    <Card.Section p="xs">
                      <Text>{opt.name}</Text>
                      <Text size="xs" c="dimmed" lineClamp={2}>
                        {opt.description}
                      </Text>
                      <Title mt={10} order={4}>
                        {opt?.base_price?.toFixed(2)}{" "}
                        <span style={{ fontSize: 10 }}>ETB</span>
                      </Title>
                    </Card.Section>
                    <Box style={{ position: "absolute", bottom: -2, right: 5 }}>
                      <ActionIcon p={2} variant="subtle" size="md">
                        <IconShoppingBagPlus />
                      </ActionIcon>
                    </Box>
                  </Card>
                )
              )}
            </SimpleGrid>
          </ScrollArea>
        </>
      )}
      {userType === "SELL" && (
        <ScrollArea type="never" style={{ height: "calc(100vh - 267px)" }}>
          <SimpleGrid mb="sm" cols={2}>
            {requests?.data?.map(
              (opt: {
                notes: string;
                product: { name: string; quantity: number };
              }) => (
                <Card withBorder shadow="sm" key={opt.notes}>
                  <Card.Section>
                    <Image src={Logo.src} alt="Logo" width={200} height={200} />
                  </Card.Section>
                  <Card.Section p="xs">
                    <Text>{opt?.product?.name}</Text>
                    <Text size="xs" c="dimmed" lineClamp={2}>
                      {opt.notes}
                    </Text>
                  </Card.Section>
                  <Button
                    rightSection={<IconCheck size={18} />}
                    justify="space-between"
                    mx={0}
                    size="xs"
                    variant="light"
                  >
                    Quote
                  </Button>
                </Card>
              )
            )}
          </SimpleGrid>
        </ScrollArea>
      )}
    </BasicShell>
  );
}
