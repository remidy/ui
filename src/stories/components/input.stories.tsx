import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { Input, InputProps } from "../../components/input";

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/Input"
};

export default meta;

export const InputStory: Story = {
  args: {
    id: "id",
    name: "name",
    type: "text",
    value: "Value"
  },
  name: "Input",
  render(args) {
    const [, updateArgs] = useArgs<InputProps>();

    return (
      <>
        <label htmlFor={args.id}>
          Label
        </label>
        <Input
          {...args}
          className="mt-4"
          onChange={(event) => updateArgs({ value: event.target.value })}
        />
      </>
    );
  }
};
