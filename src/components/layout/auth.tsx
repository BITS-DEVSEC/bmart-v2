import {
  Anchor,
  Card,
  Flex,
  Modal,
  PinInput,
  Text,
  Title,
} from "@mantine/core";
import CustomButton from "../ui/button";
import { IconArrowRightDashed, IconDeviceMobile } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { ContainedInputs } from "../ui/inputs/text";

export default function Auth({
  opened,
  toggle,
  regPage,
  alt,
}: {
  opened: boolean;
  toggle: () => void;
  regPage?: boolean;
  alt?: boolean;
}) {
  const router = useRouter();
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.85,
        blur: 6,
      }}
      opened={opened}
      onClose={toggle}
      title={<Text fw={700}>LOGIN</Text>}
    >
      {alt && (
        <Card withBorder>
          <Flex justify="space-between" align="center">
            <Flex direction="column">
              <Title order={4}>0978616116</Title>
              <Text size="xs" c="dimmed">
                Nigus Solomon Takele
              </Text>
              <Text size="xs" c="dimmed">
                00-1234-212-1
              </Text>
            </Flex>
            <IconDeviceMobile />
          </Flex>
        </Card>
      )}
      {!alt && (
        <ContainedInputs
          label="Phone Number"
          placeholder="Enter your phone number"
        />
      )}
      <Title mt="md" size="xs">
        Enter your pin
      </Title>
      <PinInput mb="sm" my="xs" mask length={6} size="md" />
      <CustomButton
        action={() => toggle()}
        label={alt ? "Finish" : "Login"}
        ltr
        icon={<IconArrowRightDashed size={20} />}
      />
      {!alt && (
        <Text mt="md" size="sm" c="dimmed">
          Don&apos;t have an account?{" "}
          <Anchor
            component="button"
            onClick={() => (regPage ? toggle() : router.push("/register"))}
          >
            Register
          </Anchor>
        </Text>
      )}
    </Modal>
  );
}
