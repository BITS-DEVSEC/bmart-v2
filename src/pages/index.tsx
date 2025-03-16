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
} from "@mantine/core";
import Image from "next/image";
import Logo from "@/assets/cardbg.svg";
import {
  IconCheck,
  IconMoodSad,
  IconShoppingBagPlus,
} from "@tabler/icons-react";
import FilterOptions from "./_filter";
import { useDisclosure } from "@mantine/hooks";
import {
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/products";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetRequestsQuery,
  useCreateQuotationsMutation,
} from "@/redux/api/requests";
import { notifications } from "@mantine/notifications";
import DetailsP from "./_details";
import { useState } from "react";

export default function Home() {
  const userType = useAppSelector((state) => state.userType.value);
  const [filterOpened, { toggle: filterToggle }] = useDisclosure();
  const [detailsOpened, { toggle: detailsToggle }] = useDisclosure();
  const [activeProduct, setActiveProduct] = useState<{
    name: string;
    description: string;
  }>();
  const { data: products, isLoading } = useGetProductsQuery({});
  const { data: categories } = useGetProductCategoriesQuery({});
  const { data: requests } = useGetRequestsQuery({});
  const [createQuotations, { isLoading: isCreating }] =
    useCreateQuotationsMutation();
  return (
    <BasicShell alt>
      <DetailsP
        title={activeProduct?.name}
        opened={detailsOpened}
        toggle={detailsToggle}
      />
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
            <LoadingOverlay variant="bars" visible={isLoading || isCreating} />
            {products?.data?.length > 0 && (
              <SimpleGrid mb="sm" cols={2}>
                {products?.data?.map(
                  (opt: {
                    name: string;
                    description: string;
                    base_price: number;
                  }) => (
                    <Card
                      onClick={() => {
                        detailsToggle();
                        setActiveProduct(opt);
                      }}
                      withBorder
                      shadow="sm"
                      key={opt.name}
                    >
                      <Flex justify="space-between" direction="column">
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
                        </Card.Section>
                      </Flex>
                      <Box
                        style={{
                          position: "absolute",
                          bottom: -2,
                          right: 5,
                          display: "none",
                        }}
                      >
                        <ActionIcon p={2} variant="subtle" size="md">
                          <IconShoppingBagPlus />
                        </ActionIcon>
                      </Box>
                    </Card>
                  )
                )}
              </SimpleGrid>
            )}
            {products?.data?.length == 0 && (
              <Card withBorder>
                <Flex gap={10} align="center">
                  <IconMoodSad size={40} />
                  <Text>No products found</Text>
                </Flex>
              </Card>
            )}
          </ScrollArea>
        </>
      )}
      {userType === "SELL" && (
        <ScrollArea type="never" style={{ height: "calc(100vh - 267px)" }}>
          <LoadingOverlay visible={isLoading || isCreating} />
          {requests?.data?.length > 0 && (
            <SimpleGrid mb="sm" cols={2}>
              {requests?.data?.map(
                (opt: {
                  id: number;
                  notes: string;
                  product: { name: string; quantity: number };
                }) => (
                  <Card withBorder shadow="sm" key={opt.notes}>
                    <Card.Section>
                      <Image
                        src={Logo.src}
                        alt="Logo"
                        width={200}
                        height={200}
                      />
                    </Card.Section>
                    <Card.Section p="xs">
                      <Text>{opt?.product?.name}</Text>
                      <Text size="xs" c="dimmed" lineClamp={2}>
                        {opt.notes}
                      </Text>
                    </Card.Section>
                    <Button
                      onClick={async () => {
                        const res = await createQuotations({
                          item_request_id: opt?.id,
                        });
                        if (res?.data?.success) {
                          notifications.show({
                            title: "Success",
                            message: "Quotation created successfully",
                            color: "green",
                          });
                        } else {
                          notifications.show({
                            title: "Error",
                            message: "Quotation creation failed",
                            color: "red",
                          });
                        }
                      }}
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
          )}
          {requests?.data?.length == 0 && (
            <Card withBorder>
              <Flex gap={10} align="center">
                <IconMoodSad size={40} />
                <Text>No requests found</Text>
              </Flex>
            </Card>
          )}
        </ScrollArea>
      )}
    </BasicShell>
  );
}
