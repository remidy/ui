import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../../components/button/button";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button"
};

export default meta;

export const ButtonStory: Story = {
  args: {
    children: "Button",
    color: "primary",
    type: "button"
  },
  name: "Button"
};
