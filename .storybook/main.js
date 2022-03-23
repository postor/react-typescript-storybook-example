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
  // webpackFinal: async (config, { configType }) => {
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ['style-loader', 'css-loader', 'sass-loader'],
  //     include: path.resolve(__dirname, '../'),
  //   });

  //   // Return the altered config
  //   return config;
  // },

}