const rspack = require("@rspack/core");
const path = require("path");

const mf = new rspack.container.ModuleFederationPlugin({
  remotes: {
    red: 'red@http://localhost:2001/remoteEntry.js'
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});

const page = new rspack.HtmlRspackPlugin({
  templateContent: `<!doctype html><meta charset=utf8><title>Module Federation - Tractor Sample</title><div id="app"></div>`,
});

module.exports = {
  entry: {
    main: "./src/index.ts",
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
    port: 1234,
  },
  plugins: [mf, page],
};
