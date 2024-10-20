import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxProps } from "../../components/checkbox";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Components/Checkbox"
};

export default meta;

export const CheckboxStory: Story = {
  args: {
    checked: true,
    name: "name",
    value: "Value"
  },
  name: "Checkbox",
  render(args) {
    const [, updateArgs] = useArgs<CheckboxProps>();

    return (
      <label className="flex gap-8 items-center">
        <Checkbox
          {...args}
          onChange={(event) => updateArgs({ checked: event.target.checked })}
        />
        Label
      </label>
    );
  }
};
