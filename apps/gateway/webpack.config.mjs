import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const { ModuleFederationPlugin } = webpack.container;

/** @type {import('webpack').Configuration} */
export default {
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'gateway',
      remotes: {
        nextApp: 'nextApp@http://localhost:3001/_next/static/remoteEntry.js',
        imageApp: 'imageApp@http://localhost:3002/remoteEntry.js',
        todoApp: 'todoApp@http://localhost:3003/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.1.0',
          eager: true,
          strictVersion: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.1.0',
          eager: true,
          strictVersion: true,
        },
        vue: {
          singleton: true,
          requiredVersion: '^3.5.17',
          strictVersion: true,
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '^4.5.1',
          strictVersion: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
