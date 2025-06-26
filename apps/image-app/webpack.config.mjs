import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
const { ModuleFederationPlugin } = webpack.container;

/** @type {import('webpack').Configuration} */
export default {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3002/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
  module: {
    rules: [{ test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader' }],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'imageApp',
      filename: 'remoteEntry.js',
      exposes: {
        './ImageApp': './src/app',
      },
      // Грузит свою копию shared (это декларация, не перетирает host)
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
