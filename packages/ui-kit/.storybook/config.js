import { configure, setAddon, addDecorator } from '@storybook/react';
import chaptersAddon from 'react-storybook-addon-chapters';
import '../assets/main.css';

setAddon(chaptersAddon);
// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);
