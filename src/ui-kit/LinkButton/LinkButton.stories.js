/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LinkButton from 'ui-kit/LinkButton';
import { MemoryRouter } from 'react-router';

const onClick = action('link button clicked!');

const withDecorator = (node) => () => {
  return node;
}

storiesOf('LinkButton', module)
  .addDecorator(story => (
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .addWithChapters('Link Button with icon', {
    chapters: [
        {
            sections: [
                {
                    title: 'Default',
                    sectionFn: withDecorator(<LinkButton to="#">Link</LinkButton>)
                },
                {
                    title: 'Transparent',
                    sectionFn: withDecorator(<LinkButton use="transparent" to="#">Link</LinkButton>)
                },
                {
                    title: 'Small',
                    sectionFn: withDecorator(<LinkButton to="#" size="sm">Link</LinkButton>)
                },
            ]
        }
    ]
});

