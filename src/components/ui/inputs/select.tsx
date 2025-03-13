import { Select } from "@mantine/core";
import classes from "./style.module.css";

export function ContainedSelect({
  label,
  placeholder,
  mt,
  mb,
  mr,
  ml,
  data,
  search,
  setValue,
  value,
  override = false,
  mutator,
}: {
  label: string;
  placeholder: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  data?: string[] | { label: string; value: string }[];
  search?: boolean;
  value?: string;
  setValue?: (value: string | null) => void;
  override?: boolean;
  mutator?: (value: string | null) => void;
}) {
  return (
    <>
      <Select
        value={value}
        onChange={(value) => (!override ? setValue?.(value) : mutator?.(value))}
        searchable={search}
        mt={mt}
        mb={mb}
        mr={mr}
        ml={ml}
        comboboxProps={{ withinPortal: true }}
        data={data || []}
        placeholder={placeholder}
        label={label}
        classNames={classes}
      />
    </>
  );
}
