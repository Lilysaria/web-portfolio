

import { MDXProvider } from '@mdx-js/react';
import MyCustomComponent from '../MyCustomComponent/MyCustomComponent.tsx';
import StyledMarkdownComponent from '../StyledMarkdownComponent/StyledMarkdownComponent.tsx';

const components = {
  MyCustomComponent,
  StyledMarkdownComponent,
};

const MDXLayout = ({ children }) => {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
};

export default MDXLayout;
