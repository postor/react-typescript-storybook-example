const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: join(__dirname, 'src', 'index.ts'),
  output: {
    path: join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: [
              [
                "auto-import", {
                  "declarations": [
                    { "default": "React", "path": "react" }
                  ]
                }
              ],
              [
                "@babel/plugin-transform-runtime"
              ]
            ]
          }
        }
      },
      {
        loader: "html-loader",
      },
      {
        loader: "markdown-loader",
        options: {
          // Pass options to marked
          // See https://marked.js.org/using_advanced#options
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}