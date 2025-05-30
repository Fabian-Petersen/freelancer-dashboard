"use client";

import {
  Select,
  Portal,
  createListCollection,
  SelectItem,
} from "@chakra-ui/react";

type SelectItem = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  items: SelectItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function SelectInput({
  items,
  value,
  onChange,
  placeholder = "Select option",
}: // contentRef,
CustomSelectProps) {
  const data = createListCollection({ items });

  return (
    <Select.Root
      collection={data}
      value={[value]}
      onValueChange={(e) => onChange(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          borderColor={{ base: "gray.400/40", _dark: "gray.500/50" }}
        >
          <Select.ValueText
            placeholder={placeholder}
            px={2}
            textTransform={"capitalize"}
            color={{ base: "gray.700", _dark: "gray.50/60" }}
          />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      {/* <Portal container={{ current: contentRef.current }}> */}
      <Portal>
        <Select.Positioner>
          <Select.Content p={2}>
            {items.map((option) => (
              <Select.Item
                item={option}
                key={option.value}
                p={1}
                textTransform={"capitalize"}
                _hover={{ cursor: "pointer" }}
              >
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

export default SelectInput;
