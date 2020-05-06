module.exports = {
  devServer: {
    proxy: `http://${process.env.VUE_APP_APIBASE}`,
  },
};
