import { Textarea } from "@mantine/core";
import classes from "./style.module.css";

export function ContainedInputAreas({
  label,
  placeholder,
  mt,
  mb,
  mr,
  ml,
  setValue,
  value,
  minr,
  override = false,
  mutator,
}: {
  label: string;
  placeholder: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  minr?: number;
  setValue?: (value: string) => void;
  value?: string;
  override?: boolean;
  mutator?: (value: string) => void;
}) {
  return (
    <>
      <Textarea
        value={value}
        autosize
        minRows={minr || 1}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          !override
            ? setValue?.(event.currentTarget.value)
            : mutator?.(event.currentTarget.value)
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
