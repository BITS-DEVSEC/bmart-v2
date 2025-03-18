import BasicShell from "@/components/layout/basicShell";
import { SegmentedControl } from "@mantine/core";
import { useState } from "react";
import List from "./_list";

export default function Store() {
  const [active, setActive] = useState("Store");
  return (
    <BasicShell alt noSearch noSell>
      <SegmentedControl
        data={["Store", "Store Inventory"]}
        onChange={(e) => setActive(e as string)}
        value={active}
        color="primary"
        mb="sm"
        fullWidth
      />
      <List
        type={
          active == "Store"
            ? "store"
            : active == "Store Inventory"
            ? "inventory"
            : ""
        }
      />
    </BasicShell>
  );
}
