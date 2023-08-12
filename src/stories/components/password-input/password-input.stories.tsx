import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PasswordInput } from "../../../components/password-input/password-input";

type Story = StoryObj<typeof PasswordInput>;

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  title: "Components/Password Input"
};

export default meta;

export const PasswordInputStory: Story = {
  args: {
    name: "passwordInput"
  },
  name: "Password Input",
  render(args) {
    const [value, setValue] = useState("");

    return (
      <PasswordInput
        {...args}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  }
};
