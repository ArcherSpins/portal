import { configure, setAddon } from '@storybook/react';
import chaptersAddon from 'react-storybook-addon-chapters';

import '../src/main/App/App.module.scss';
setAddon(chaptersAddon);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);
