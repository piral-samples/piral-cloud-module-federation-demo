const rspack = require("@rspack/core");
const path = require("path");

const mf = new rspack.container.ModuleFederationPlugin({
  name: "red",
  filename: "remoteEntry.js",
  exposes: {
    "./product-page": "./src/product-page.tsx",
  },
  remotes: {
    blue: 'blue@http://localhost:2002/remoteEntry.js',
    green: 'green@http://localhost:2003/remoteEntry.js',
  },
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
    port: 2001,
  },
  plugins: [mf],
};
