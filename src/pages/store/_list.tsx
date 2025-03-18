import {
  ActionIcon,
  Card,
  Flex,
  Select,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { IconBuilding, IconPlus } from "@tabler/icons-react";
import New from "./_new";
import { useDisclosure } from "@mantine/hooks";

export default function List({ type }: { type: string }) {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <New type={type} opened={opened} toggle={toggle} />
      {type == "store" && (
        <>
          <Flex mb="xs" align="center" justify="space-between" px={5}>
            <Flex gap={5} align="center">
              <IconBuilding size={16} />
              <Title order={5}>My Stores</Title>
            </Flex>
            <ActionIcon onClick={toggle} variant="filled" size="xs">
              <IconPlus size={18} />
            </ActionIcon>
          </Flex>
          {[1, 2, 3].map((opt) => (
            <Card mb="xs" withBorder key={opt}>
              <Flex align="center" justify="space-between">
                <Flex align="center" gap={10}>
                  <IconBuilding size={30} />
                  <Flex direction="column">
                    <Title order={5}>Store {opt}</Title>
                    <Text c="dimmed" size="xs">
                      Addis Ababa | Bole | 08
                    </Text>
                  </Flex>
                </Flex>
                <Switch size="xs" />
              </Flex>
            </Card>
          ))}
        </>
      )}

      {type == "inventory" && (
        <>
          <Flex justify="space-between" gap={5} mb="xs" align="center">
            <Select placeholder="Select a stores" />
            <ActionIcon onClick={toggle} variant="filled" size="md">
              <IconPlus size={18} />
            </ActionIcon>
          </Flex>

          {[1, 2, 3].map((opt) => (
            <Card mb="xs" withBorder key={opt}>
              <Flex align="center" justify="space-between">
                <Flex align="center" gap={10}>
                  <IconBuilding size={30} />
                  <Flex direction="column">
                    <Title order={5}>Store {opt}</Title>
                    <Text c="dimmed" size="xs">
                      Addis Ababa | Bole | 08
                    </Text>
                  </Flex>
                </Flex>
                <Switch size="xs" />
              </Flex>
            </Card>
          ))}
        </>
      )}
    </>
  );
}
