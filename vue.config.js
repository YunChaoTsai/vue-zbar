module.exports = {
  chainWebpack: (webpackConfig) => {
    webpackConfig.module
      .rule("wasm.bin")
      .test(/\.wasm\.bin$/)
      .use("file-loader")
      .loader("file-loader");
  },
};
