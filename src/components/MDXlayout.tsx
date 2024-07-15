

import { MDXProvider } from '@mdx-js/react';
import { ReactNode } from 'react';
import MyCustomComponent from './MyCustomComponent/MyCustomComponent';
import StyledMarkdownComponent from './StyledMarkdownComponent/StyledMarkdownComponent';

const components = {
  MyCustomComponent,
  StyledMarkdownComponent,
};
// Define the expected shape of props
interface MDXLayoutProps {
  children: ReactNode;
}

const MDXLayout = ({ children }: MDXLayoutProps) => {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
};

export default MDXLayout;
