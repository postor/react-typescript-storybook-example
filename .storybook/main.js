const ReactDocgenTypescriptPlugin = require("@storybook/react-docgen-typescript-plugin").default;


module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.story.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.story.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  plugins:[
    new ReactDocgenTypescriptPlugin()
  ]
}