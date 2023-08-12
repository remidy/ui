import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "../../../components/input/input";

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/Input"
};

export default meta;

export const InputStory: Story = {
  args: {
    name: "input",
    type: "text"
  },
  name: "Input",
  render(args) {
    const [value, setValue] = useState("");

    return (
      <Input
        {...args}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  }
};
