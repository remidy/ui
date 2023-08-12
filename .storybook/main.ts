import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-controls",
    "@storybook/addon-docs",
    {
      name: "@storybook/addon-styling",
      options: {
        sass: {
          implementation: require("sass")
        }
      }
    }
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.tsx"
  ]
};

export default config;
