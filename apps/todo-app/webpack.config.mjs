import path from 'path';
import { fileURLToPath } from 'url';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const { ModuleFederationPlugin } = webpack.container;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */
export default {
  entry: './src/main.ts',
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3003/',
    clean: true,
    path: path.resolve(__dirname, 'dist'), // теперь работает
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  devServer: {
    port: 3003,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'todoApp',
      filename: 'remoteEntry.js',
      exposes: {
        './TodoApp': './src/vue-in-react.tsx',
      },
      // Грузит свою копию shared (это декларация, не перетирает host)
      shared: {
        vue: { singleton: true, requiredVersion: '^3.5.17' },
        'vue-router': { singleton: true, requiredVersion: '^4.5.1' },
        react: {
          singleton: true,
          requiredVersion: '^19.1.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.1.0',
        },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
