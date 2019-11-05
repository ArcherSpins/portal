/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Breadcrumbs from 'ui-kit/Breadcrumbs';
import { storiesOf } from '@storybook/react';

const routes = {
  '/': 'Home',
  '/blog': 'Blog', 
  '/users': 'Users',
  '/users/:id/info': 'User Info',
  '/users/:id/posts/:p_id': 'Post :p_id by :id',
  '/users/:id/posts/:page': (url, match) => `Page ${match[':page']}`,
};

storiesOf('Breadcrumbs', module)
  .addWithChapters('Breadcrumbs', {
    chapters: [
      {
        info: "Breadcrumbs component",
        sections: [
          {
            title: 'Breadcrumbs',
            sectionFn: () => {
              return <Router><Breadcrumbs routes={routes} /></Router>;
            },
          },
        ],
      },
    ],
  });

