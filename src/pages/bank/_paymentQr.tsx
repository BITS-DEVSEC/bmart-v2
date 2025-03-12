import { ContainedInputs } from "@/components/ui/inputs/text";
import { Center, Modal, Text } from "@mantine/core";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

export default function PaymentQr({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (parseFloat(amount) >= 100) {
      setQr(`https://b2bweb-qa.bitscollege.edu.et/payment/`);
    } else {
      setQr("");
    }
  }, [amount]);

  return (
    <Modal title="Get Payment Qr" opened={opened} onClose={toggle}>
      <ContainedInputs
        label="Payment Amount"
        placeholder="Enter payment amount"
        value={amount}
        setValue={setAmount}
      />
      {parseFloat(amount) < 100 && (
        <Text ta="right" c="dimmed" size="xs" mt={5}>
          Minimum payment amount is 100 ETB
        </Text>
      )}
      {amount && qr && (
        <>
          <Text ta="center" my="xs">
            Your Payment QR Code for amount: {amount}
          </Text>
          <Center mt="lg">
            <QRCodeSVG value={qr} size={256} level="L" />
          </Center>
        </>
      )}
    </Modal>
  );
}
