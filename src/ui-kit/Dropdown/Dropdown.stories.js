/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropdown from 'ui-kit/Dropdown';

const onChange = action('Dropdown value changed!');

const optionsArray = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const withDecorator = (node) => () => <div>{node}</div>;

storiesOf('Dropdown', module).addWithChapters('Just Dropdown', {
    chapters: [
        {
            sections: [
                {
                    title: 'Default',
                    sectionFn: withDecorator(<Dropdown options={optionsArray} use='label' value={optionsArray[1]} onChange={onChange} label='Title' />)
                },
                {
                    title: 'Borderless',
                    sectionFn: withDecorator(<Dropdown options={optionsArray} use='borderless' value={optionsArray[1]} onChange={onChange} label='Title' borderless={true} />)
                },
                {
                    title: 'Disabled',
                    sectionFn: withDecorator(<Dropdown options={optionsArray} use='label' value={optionsArray[1]} onChange={onChange} label='Title' disabled={true} />)
                }
            ]
        }
    ]
});
