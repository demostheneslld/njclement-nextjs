/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
}

