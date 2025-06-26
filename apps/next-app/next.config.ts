import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'nextApp',
        filename: 'static/remoteEntry.js',
        exposes: {
          './NextApp': './src/pages/index.tsx',
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
        extraOptions: {},
      }),
    );

    return config;
  },
};

export default nextConfig;
