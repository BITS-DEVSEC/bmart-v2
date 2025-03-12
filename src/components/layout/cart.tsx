import {
  ActionIcon,
  Box,
  Card,
  Drawer,
  Flex,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import CustomButton from "../ui/button";
import {
  IconArrowRightDashed,
  IconBox,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

export default function Cart({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <Drawer opened={opened} onClose={toggle} title="Shopping Cart">
      <Flex
        direction="column"
        justify="space-between"
        style={{ height: "calc(100vh - 87px)" }}
      >
        <ScrollArea type="never" style={{ height: "calc(100vh - 155px)" }}>
          <Box>
            {[1, 2, 3, 4, 5, 6, 7].map((opt) => (
              <Card mb="lg" withBorder key={opt}>
                <Flex gap={25} justify="space-between" align="center">
                  <Flex gap={10}>
                    <IconBox size={45} />
                    <Flex direction="column">
                      <Title order={5}>Item {opt}</Title>
                      <Text mt={-1} size="xs" c="dimmed">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Iusto.
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex gap={10} align="center" direction="column">
                    <ActionIcon color="green" variant="default" size="xs">
                      <IconPlus />
                    </ActionIcon>
                    <Text size="sm" c="dimmed">
                      2
                    </Text>
                    <ActionIcon color="red" variant="default" size="xs">
                      <IconMinus />
                    </ActionIcon>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Box>
        </ScrollArea>
        <CustomButton
          icon={<IconArrowRightDashed size={20} />}
          ltr
          label="PLACE ORDER"
        />
      </Flex>
    </Drawer>
  );
}
