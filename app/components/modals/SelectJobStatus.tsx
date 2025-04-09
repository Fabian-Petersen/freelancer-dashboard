"use client";

// $ This component renders the job status select option component

import { Portal, Select, createListCollection } from "@chakra-ui/react";

const SelectJobStatus = () => {
  return (
    <Select.Root collection={status} size="md">
      <Select.HiddenSelect />
      <Select.Label>Status</Select.Label>
      <Select.Control>
        <Select.Trigger>
          {/* <Select.ValueText placeholder="Select" /> */}
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {status.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectJobStatus;

const status = createListCollection({
  items: [
    { label: "applied", value: "applied" },
    { label: "interview", value: "interview" },
    { label: "on hold", value: "on hold" },
    { label: "unsccessful", value: "unsuccessful" },
  ],
});
