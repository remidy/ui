import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { Textarea, TextareaProps } from "../../components/textarea";

type Story = StoryObj<typeof Textarea>;

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: "Components/Textarea"
};

export default meta;

export const TextareaStory: Story = {
  args: {
    id: "id",
    name: "name",
    value: "Value"
  },
  name: "Textarea",
  render(args) {
    const [, updateArgs] = useArgs<TextareaProps>();

    return (
      <>
        <label htmlFor={args.id}>
          Label
        </label>
        <Textarea
          {...args}
          className="mt-4"
          onChange={(event) => updateArgs({ value: event.target.value })}
        />
      </>
    );
  }
};
