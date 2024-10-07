import withPlugins from 'next-compose-plugins';
import withMDX from '@next/mdx';
import withBundleAnalyzer from '@next/bundle-analyzer';

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
});

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPlugins([mdxConfig, bundleAnalyzer], nextConfig);
