import { Configuration } from "webpack";
import { resolve } from "path";

const config: Configuration = {
  mode: 'development',
  target: 'node',
  entry: {
    'nodeHelloLambda': './services/node-lambda/hello.ts',
  },
  module: {
    rules: [
      {
        include: resolve(__dirname),
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json',
          },
        },
      },
    ],
  },
  externals: {
    '@aws-cdk/core': '@aws-cdk/core',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: resolve(__dirname, 'build'),
    filename: '[name]/[name].js',
  },
};

export default config;
