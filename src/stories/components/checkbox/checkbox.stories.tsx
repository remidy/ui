import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "../../../components/checkbox/checkbox";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Components/Checkbox"
};

export default meta;

export const CheckboxStory: Story = {
  args: {
    name: "checkbox"
  },
  name: "Checkbox",
  render(args) {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked!)}
      />
    );
  }
};
