import BasicShell from "@/components/layout/basicShell";
import { ScrollArea, SegmentedControl } from "@mantine/core";
import { useState } from "react";
import IncomingOrders from "./_incoming";
import OutgoingOrders from "./_outgoing";

export default function Request() {
  const [active, setActive] = useState("Incoming");
  return (
    <BasicShell alt>
      <SegmentedControl
        onChange={(e) => setActive(e as string)}
        value={active}
        color="primary"
        mb="sm"
        fullWidth
        data={["Quotations", "Incoming", "Outgoing"]}
      />
      <ScrollArea
        type="never"
        style={{ height: "calc(100vh - 285px)", width: "100%" }}
      >
        {active === "Incoming" && <IncomingOrders />}
        {active === "Outgoing" && <OutgoingOrders />}
      </ScrollArea>
    </BasicShell>
  );
}
