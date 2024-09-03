const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "crypto": require.resolve('crypto-browserify'),
      "stream": require.resolve('stream-browserify'),
      "assert": require.resolve('assert'),
      "http": require.resolve('stream-http'),
      "https": require.resolve('https-browserify'),
      "os": require.resolve('os-browserify/browser'),
      "url": require.resolve('url')
    }
  },
  entry: './src/index.js', // Update this with your actual entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  }
};