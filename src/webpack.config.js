const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace './src/index.js' with the entry file of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Replace 'dist' with your desired output directory
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
