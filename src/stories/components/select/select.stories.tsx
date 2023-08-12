import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "../../../components/select/select";

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Components/Select"
};

export default meta;

export const SelectStory: Story = {
  args: {
    id: "select",
    items: [
      { text: "Item 1", value: "1" },
      { text: "Item 2", value: "2" },
      { text: "Item 3", value: "3" },
      { text: "Item 4", value: "4" },
      { text: "Item 5", value: "5" },
      { text: "Item 6", value: "6" },
      { text: "Item 7", value: "7" },
      { text: "Item 8", value: "8" },
      { text: "Item 9", value: "9" },
      { text: "Item 10", value: "10" }
    ],
    name: "select"
  },
  name: "Select",
  render(args) {
    const [value, setValue] = useState("");

    return (
      <Select
        {...args}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  }
};
