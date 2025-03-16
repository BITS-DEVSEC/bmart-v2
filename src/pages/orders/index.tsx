import BasicShell from "@/components/layout/basicShell";
import { ScrollArea, SegmentedControl } from "@mantine/core";
import { useState } from "react";
import OutgoingOrders from "./_outgoing";
import Quotations from "./quotations";

export default function Request() {
  const [active, setActive] = useState("Quotations");
  return (
    <BasicShell noSearch noSell alt>
      <SegmentedControl
        onChange={(e) => setActive(e as string)}
        value={active}
        color="primary"
        mb="sm"
        fullWidth
        data={["Quotations", "Incoming"]}
      />
      <ScrollArea
        type="never"
        style={{ height: "calc(100vh - 285px)", width: "100%" }}
      >
        {active === "Quotations" && <Quotations />}
        {active === "Incoming" && <OutgoingOrders />}
      </ScrollArea>
    </BasicShell>
  );
}
