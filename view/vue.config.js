const path = require("path");
module.exports = {
  transpileDependencies: ["vuetify"],
  //publicPath: "./",
  outputDir: path.resolve(__dirname, "..", "public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:4001"
      }
    }
  }
};
