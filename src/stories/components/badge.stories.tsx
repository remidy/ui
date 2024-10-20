import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../components/badge";

type Story = StoryObj<typeof Badge>;

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Components/Badge"
};

export default meta;

export const BadgeStory: Story = {
  args: {
    children: "Badge",
    color: "neutral"
  },
  name: "Badge"
};
