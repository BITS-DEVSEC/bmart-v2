import BasicShell from "@/components/layout/basicShell";
import NewRequest from "./_new";
import { ScrollArea, SegmentedControl } from "@mantine/core";
import ListRequest from "./_list";
import { useState } from "react";

export default function Request() {
  const [active, setActive] = useState("Published Requests");
  return (
    <BasicShell noSell alt>
      <SegmentedControl
        onChange={(e) => setActive(e as string)}
        value={active}
        color="primary"
        mb="sm"
        fullWidth
        data={["Published Requests", "New Request"]}
      />
      <ScrollArea
        type="never"
        style={{ height: "calc(100vh - 285px)", width: "100%" }}
      >
        {active === "Published Requests" && <ListRequest />}
        {active === "New Request" && <NewRequest />}
      </ScrollArea>
    </BasicShell>
  );
}
