import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { Select, SelectProps } from "../../components/select";

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Components/Select"
};

export default meta;

export const SelectStory: Story = {
  args: {
    id: "id",
    name: "name",
    options: [
      { text: "Option 1", value: "1" },
      { text: "Option 2", value: "2" },
      { text: "Option 3", value: "3" },
      { text: "Option 4", value: "4" },
      { text: "Option 5", value: "5" },
      { text: "Option 6", value: "6" },
      { text: "Option 7", value: "7" },
      { text: "Option 8", value: "8" },
      { text: "Option 9", value: "9" },
      { text: "Option 10", value: "10" }
    ],
    value: "1"
  },
  name: "Select",
  render(args) {
    const [, updateArgs] = useArgs<SelectProps>();

    return (
      <>
        <label htmlFor={args.id}>
          Label
        </label>
        <Select
          {...args}
          className="mt-4"
          onChange={(event) => updateArgs({ value: event.target.value })}
        />
      </>
    );
  }
};
