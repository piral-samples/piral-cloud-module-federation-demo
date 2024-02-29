const rspack = require("@rspack/core");
const path = require("path");

const mf = new rspack.container.ModuleFederationPlugin({
  name: "blue",
  filename: "remoteEntry.js",
  exposes: {
    "./basketInfo": "./src/basket-info.tsx",
    "./buyButton": "./src/buy-button.tsx",
  },
  remotes: {},
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});

module.exports = {
  entry: {
    main: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        type: "asset",
      },
      {
        test: /\.jpg$/,
        type: "asset",
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".wasm"],
  },
  devServer: {
    port: 2002,
  },
  plugins: [mf],
};
