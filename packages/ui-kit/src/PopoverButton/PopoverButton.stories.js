/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PopoverButton from 'ui-kit/PopoverButton';

const onClick = action('add button clicked!');

const withDecorator = (node) => () => <div>{node}</div>;

storiesOf('PopoverButton', module).addWithChapters('Popover Button', {
    chapters: [
        {
            sections: [
                {
                    title: 'Default',
                    sectionFn: withDecorator(<PopoverButton popover='Add Task' onClick={onClick}></PopoverButton>)
                },
                {
                    title: 'Disabled',
                    sectionFn: withDecorator(<PopoverButton disabled={true} onClick={onClick}></PopoverButton>)
                },
                {
                    title: 'With Spinner',
                    sectionFn: withDecorator(<PopoverButton popover='Add Task' loading={true} onClick={onClick}></PopoverButton>)
                },
            ]
        }
    ]
});
