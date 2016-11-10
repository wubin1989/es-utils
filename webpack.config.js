module.exports = {
  entry: ['babel-polyfill', './EsUtil.js'],
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  externals: [
    /^(?!\.|\/).+/i,
  ],
  devtool: 'sourcemap',
  target: 'node',
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  }
}