import { Drawer } from "@mantine/core";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QrScanner({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const [data, setData] = useState("Not Found");

  return (
    <Drawer opened={opened} onClose={toggle}>
      <>
        <QrReader
          onResult={(result, error) => {
            if (result?.getText) {
              setData(result.getText());
            }

            if (error) {
              console.info(error);
            }
          }}
          containerStyle={{ width: "100%" }}
          constraints={{
            facingMode: "environment", // Use "user" for front camera
          }}
        />
        <p>{data}</p>
      </>
    </Drawer>
  );
}
