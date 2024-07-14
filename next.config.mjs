import withMDX from '@next/mdx';

const mdxConfig = withMDX({
  extension: /\.mdx?$/
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default mdxConfig(nextConfig);
