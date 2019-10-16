/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddButton from 'ui-kit/AddButton';

const onClick = action('add button clicked!');

const withDecorator = (node) => () => <div>{node}</div>;

storiesOf('AddButton', module).addWithChapters('Just AddButton', {
    chapters: [
        {
            sections: [
                {
                    title: 'Default',
                    sectionFn: withDecorator(<AddButton className='add-button' onClick={onClick}></AddButton>)
                }
            ]
        }
    ]
});
