import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioProps } from "../../components/radio";

type Story = StoryObj<typeof Radio>;

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: "Components/Radio"
};

export default meta;

export const RadioStory: Story = {
  args: {
    checked: true,
    name: "name",
    value: "Value"
  },
  name: "Radio",
  render(args) {
    const [, updateArgs] = useArgs<RadioProps>();

    return (
      <label className="flex gap-8 items-center">
        <Radio
          {...args}
          onChange={(event) => updateArgs({ checked: event.target.checked })}
        />
        Label
      </label>
    );
  }
};
