import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from "../../../components/textarea/textarea";

type Story = StoryObj<typeof Textarea>;

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: "Components/Textarea"
};

export default meta;

export const TextareaStory: Story = {
  args: {
    name: "textarea"
  },
  name: "Textarea",
  render(args) {
    const [value, setValue] = useState("");

    return (
      <Textarea
        {...args}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  }
};
