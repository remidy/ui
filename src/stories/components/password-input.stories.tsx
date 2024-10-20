import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { PasswordInput, PasswordInputProps } from "../../components/password-input";

type Story = StoryObj<typeof PasswordInput>;

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  title: "Components/Password Input"
};

export default meta;

export const PasswordInputStory: Story = {
  args: {
    id: "id",
    name: "name",
    value: "Value"
  },
  name: "Password Input",
  render(args) {
    const [, updateArgs] = useArgs<PasswordInputProps>();

    return (
      <>
        <label htmlFor={args.id}>
          Label
        </label>
        <PasswordInput
          {...args}
          className="mt-4"
          onChange={(event) => updateArgs({ value: event.target.value })}
        />
      </>
    );
  }
};
