import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "../../../components/radio/radio";

type Story = StoryObj<typeof Radio>;

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: "Components/Radio"
};

export default meta;

export const RadioStory: Story = {
  args: {
    name: "radio",
    value: "value"
  },
  name: "Radio",
  render(args) {
    const [checked, setChecked] = useState(false);

    return (
      <Radio
        {...args}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked!)}
      />
    );
  }
};
