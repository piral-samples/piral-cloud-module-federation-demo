const rspack = require("@rspack/core");
const path = require("path");

const mf = new rspack.container.ModuleFederationPlugin({
  name: "green",
  filename: "remoteEntry.js",
  exposes: {
    "./recommendations": "./src/product-recommendations.tsx",
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
    alias: {
      '@shared/loader': path.resolve(__dirname, '../shared/loader.ts'),
    },
  },
  devServer: {
    port: 2003,
  },
  plugins: [mf],
};
