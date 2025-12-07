const { join } = require('path');

module.exports = {
  target: 'node',
  entry: {
    main: join(__dirname, 'src/main.ts'),
  },
  output: {
    path: join(__dirname, '../../dist/apps/api'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
};

