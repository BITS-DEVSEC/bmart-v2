import { TextInput } from "@mantine/core";
import classes from "./style.module.css";

export function ContainedInputs({
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
  setValue?: (value: string) => void;
  value?: string;
  override?: boolean;
  mutator?: (value: string) => void;
}) {
  return (
    <>
      <TextInput
        value={value}
        onChange={(e) =>
          !override ? setValue?.(e.target.value) : mutator?.(e.target.value)
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
