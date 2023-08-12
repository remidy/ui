import type { Preview } from "@storybook/react";
import "../src/styles/index.scss";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Intro", "Icons", "Components"]
      }
    }
  }
};

export default preview;
