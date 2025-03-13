import { Anchor, Box, Flex, LoadingOverlay, Text, Title } from "@mantine/core";
import RegisterImage from "@/assets/register.svg";
import Logo from "@/assets/image.png";
import Image from "next/image";
import { ContainedInputs } from "@/components/ui/inputs/text";
import CustomButton from "@/components/ui/button";
import { IconArrowRightDashed, IconWorld } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Auth from "@/components/layout/auth";
import { useDisclosure } from "@mantine/hooks";
import { useLazyGetFaydaByIdQuery } from "@/redux/api/fayda";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/state/user";
import { notifications } from "@mantine/notifications";

export default function Register() {
  const dispatch = useAppDispatch();
  const [opened, { toggle }] = useDisclosure(false);
  const [faydaId, setFaydaId] = useState("");
  const [
    getFayda,
    { data: fayda, isLoading: isGettingFayda, error: faydaError },
  ] = useLazyGetFaydaByIdQuery();
  const router = useRouter();

  const handleFetchFayda = async () => {
    await getFayda(faydaId);
  };

  useEffect(() => {
    if (fayda) {
      dispatch(setUser(fayda));
      router.push("/register/details");
    } else if (faydaError) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch fayda",
        color: "red",
      });
    }
  }, [fayda, dispatch, router, faydaError]);

  return (
    <Box style={{ height: "100vh" }}>
      <LoadingOverlay visible={isGettingFayda} />
      <Auth regPage opened={opened} toggle={toggle} />
      <Box style={{ height: "60vh", zIndex: 8 }} bg="primary">
        <Flex
          h="40vh"
          justify="space-between"
          align="center"
          direction="column"
          pt="xl"
        >
          <Image width={200} height={200} src={Logo.src} alt="Logo" />
          <Image
            width={800}
            height={800}
            src={RegisterImage.src}
            alt="Register"
          />
          <Text c="white" mt={10} ta="center" size="xs" px="xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            repellendus! Debitis consectetur inventore cumque iste odit.
          </Text>
        </Flex>
      </Box>
      <Box
        bg="white"
        style={{ height: "40vh", zIndex: 10, background: "white" }}
        p="md"
      >
        <Title order={5} mb="xs">
          User Registration
        </Title>
        <ContainedInputs
          value={faydaId}
          setValue={setFaydaId}
          label="FAYDA ID Number"
          placeholder="Enter your FAYDA ID Number"
        />
        <CustomButton
          action={() => handleFetchFayda()}
          props={{ mt: "lg" }}
          label="CONTINUE"
          ltr
          icon={<IconArrowRightDashed size={20} />}
        />
        <CustomButton
          action={() => {
            router.push("/");
          }}
          props={{ mt: "xs" }}
          label="BROWSE"
          ltr
          altColor
          icon={<IconWorld size={20} />}
        />
        <Text size="sm" c="dimmed" mt="sm">
          Already have an account?{" "}
          <Anchor component="button" onClick={() => toggle()}>
            Login
          </Anchor>
        </Text>
      </Box>
    </Box>
  );
}
