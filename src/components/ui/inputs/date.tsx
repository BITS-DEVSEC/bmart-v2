import { DatePickerInput, DateValue } from "@mantine/dates";
import classes from "./style.module.css";

export function ContainedDates({
  label,
  placeholder,
  mt,
  mb,
  mr,
  ml,
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
  setValue?: (value: string | undefined) => void;
  value?: DateValue | undefined;
  override?: boolean;
  mutator?: (value: string | undefined) => void;
}) {
  return (
    <>
      <DatePickerInput
        value={value}
        onChange={(value) =>
          !override
            ? setValue?.(value?.toISOString())
            : mutator?.(value?.toISOString())
        }
        mt={mt}
        mb={mb}
        mr={mr}
        ml={ml}
        label={label}
        placeholder={placeholder}
        classNames={classes}
      />
    </>
  );
}
