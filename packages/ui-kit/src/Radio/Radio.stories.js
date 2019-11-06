/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RadioButton from '.';

const onChange = action('Dropdown value changed!');

const withDecorator = (node) => () => <div>{node}</div>;

storiesOf('RadioButton', module).addWithChapters('Just Radio', {
    chapters: [
        {
            sections: [
                {
                    title: 'Unchecked',
                    sectionFn: withDecorator(
                        <RadioButton
                            type="radio"
                            id="unchecked"
                            name="type"
                            value="value2"
                            onChange={onChange}
                            htmlFor="unchecked"
                            spanText="Unchecked"
                        />
                    )
                },
                {
                    title: 'Checked',
                    sectionFn: withDecorator(
                            <RadioButton 
                                checked={true}
                                type="radio"
                                id="checked"
                                name="type"
                                value="value1"
                                onChange={onChange}
                                htmlFor="checked"
                                spanText="Checked"    
                            />
                        )
                }
            ]
        }
    ]
});