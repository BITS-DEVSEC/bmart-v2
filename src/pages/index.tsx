import BasicShell from "@/components/layout/basicShell";
import {
  ActionIcon,
  Box,
  Card,
  Chip,
  Flex,
  ScrollArea,
  SimpleGrid,
  Text,
} from "@mantine/core";
import Image from "next/image";
import Logo from "@/assets/cardbg.svg";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import FilterOptions from "./_filter";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const [filterOpened, { toggle: filterToggle }] = useDisclosure();
  return (
    <BasicShell alt>
      <FilterOptions opened={filterOpened} toggle={filterToggle} />
      <Flex gap={10}>
        <ScrollArea type="never" style={{ height: "5vh" }}>
          <Flex gap={10} align="center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((opt) => (
              <Chip variant="light" radius="sm" key={opt}>
                Category {opt}
              </Chip>
            ))}
          </Flex>
        </ScrollArea>
        {/* <ActionIcon onClick={filterToggle} variant="default" size="md">
          <IconFilter size={18} />
        </ActionIcon> */}
      </Flex>
      <ScrollArea type="never" style={{ height: "calc(100vh - 272px)" }}>
        <SimpleGrid mb="sm" cols={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((opt) => (
            <Card withBorder shadow="sm" key={opt}>
              <Card.Section>
                <Image src={Logo.src} alt="Logo" width={200} height={200} />
              </Card.Section>
              <Card.Section p="xs">
                <Text>Card Title</Text>
                <Text size="xs" c="dimmed" lineClamp={2}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  quidem nobis illo impedi
                </Text>
              </Card.Section>
              <Box style={{ position: "absolute", bottom: -2, right: 5 }}>
                <ActionIcon p={2} variant="subtle" size="md">
                  <IconShoppingBagPlus />
                </ActionIcon>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </ScrollArea>
    </BasicShell>
  );
}
