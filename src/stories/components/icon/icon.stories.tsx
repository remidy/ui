import { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../../../components/icon/icon";

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Components/Icon"
};

export default meta;

export const IconStory: Story = {
  args: {
    name: "check"
  },
  name: "Icon"
};
