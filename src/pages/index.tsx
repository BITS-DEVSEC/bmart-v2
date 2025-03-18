import BasicShell from "@/components/layout/basicShell";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Card,
  Chip,
  Flex,
  LoadingOverlay,
  ScrollArea,
  SimpleGrid,
  Text,
} from "@mantine/core";
import Image from "next/image";
import Logo from "@/assets/imageAlt.png";
import { IconMoodSad, IconShoppingBagPlus } from "@tabler/icons-react";
import FilterOptions from "./_filter";
import { useDisclosure } from "@mantine/hooks";
import {
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/products";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetRequestsQuery,
} from "@/redux/api/requests";
import DetailsP from "./_details";
import { useState } from "react";
import DetailsR from "./_qdetails";

export default function Home() {
  const userType = useAppSelector((state) => state.userType.value);
  const [filterOpened, { toggle: filterToggle }] = useDisclosure();
  const [detailsOpened, { toggle: detailsToggle }] = useDisclosure();
  const [qdetailsOpened, { toggle: qdetailsToggle }] = useDisclosure();
  const [activeProduct, setActiveProduct] = useState<{
    name: string;
    description: string;
    image_urls: string[];
  }>();
  const [activeRequest, setActiveRequest] = useState<{
    product: {
      name: string;
      description: string;
      image_urls: string[];
    };
    id: number;
    notes: string;
  }>();
  const {
    data: products,
    isLoading,
    refetch: refetchProducts,
  } = useGetProductsQuery({});
  const { data: categories, refetch: refetchCategories } =
    useGetProductCategoriesQuery({});
  const { data: requests, refetch: refetchRequests } = useGetRequestsQuery({});
  return (
    <BasicShell
      alt
      refresh={() => {
        refetchProducts();
        refetchCategories();
        refetchRequests();
      }}
    >
      <DetailsP
        title={activeProduct?.name}
        product={activeProduct}
        opened={detailsOpened}
        toggle={detailsToggle}
      />
      <DetailsR
        title={activeRequest?.product?.name}
        product={activeRequest}
        opened={qdetailsOpened}
        toggle={qdetailsToggle}
      />
      {userType === "BUY" && (
        <>
          <FilterOptions opened={filterOpened} toggle={filterToggle} />
          <Flex gap={10}>
            <ScrollArea type="never" style={{ height: "7vh" }}>
              <Flex gap={10} align="center">
                {categories?.data?.map((opt: { id: number; name: string }) => (
                  <Chip
                    value={opt.id}
                    variant="filled"
                    radius="sm"
                    key={opt.id}
                  >
                    {opt?.name?.charAt(0)?.toUpperCase() + opt?.name?.slice(1)}
                  </Chip>
                ))}
              </Flex>
            </ScrollArea>
          </Flex>
          <ScrollArea type="never" style={{ height: "calc(100vh - 285px)" }}>
            <LoadingOverlay variant="bars" visible={isLoading} />
            {products?.data?.length > 0 && (
              <SimpleGrid mb="sm" cols={2}>
                {products?.data?.map(
                  (opt: {
                    name: string;
                    description: string;
                    base_price: number;
                    thumbnail_url: string;
                    image_urls: string[];
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
                          <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
                            <Image
                              src={`https://snf.bitscollege.edu.et/${opt.thumbnail_url}`}
                              alt="Logo"
                              width={200}
                              height={500}
                              onError={(e) => (e.currentTarget.src = Logo.src)}
                            />
                          </AspectRatio>
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
          <LoadingOverlay visible={isLoading} />
          {requests?.data?.length > 0 && (
            <SimpleGrid mb="sm" cols={2}>
              {requests?.data?.map(
                (opt: {
                  id: number;
                  notes: string;
                  product: {
                    name: string;
                    description: string;
                    thumbnail_url: string;
                    image_urls: string[];
                  };
                }) => (
                  <Card
                    onClick={() => {
                      setActiveRequest(opt);
                      qdetailsToggle();
                    }}
                    withBorder
                    shadow="sm"
                    key={opt.notes}
                  >
                    <Card.Section>
                      <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
                        <Image
                          src={`https://snf.bitscollege.edu.et/${opt.product.thumbnail_url}`}
                          alt="Logo"
                          width={200}
                          height={200}
                          onError={(e) => (e.currentTarget.src = Logo.src)}
                        />
                      </AspectRatio>
                    </Card.Section>
                    <Card.Section p="xs">
                      <Text>{opt?.product?.name}</Text>
                      <Text size="xs" c="dimmed" lineClamp={2}>
                        {opt.notes}
                      </Text>
                    </Card.Section>
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
