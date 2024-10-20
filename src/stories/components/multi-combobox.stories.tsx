import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { MultiCombobox, MultiComboboxProps } from "../../components/multi-combobox";

type Story = StoryObj<typeof MultiCombobox>;

const meta: Meta<typeof MultiCombobox> = {
  component: MultiCombobox,
  title: "Components/Multi Combobox"
};

export default meta;

export const MultiComboboxStory: Story = {
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
    value: ["1", "2", "3"]
  },
  name: "Multi Combobox",
  render(args) {
    const [, updateArgs] = useArgs<MultiComboboxProps>();

    return (
      <>
        <label htmlFor={args.id}>
          Label
        </label>
        <MultiCombobox
          {...args}
          className="mt-4"
          onChange={(event) => updateArgs({ value: event.target.value })}
        />
      </>
    );
  }
};
