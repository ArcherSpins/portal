/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextArea from '.'

const onChange = action('TextArea value changed!');


const withDecorator = (node) => () => <div>{node}</div>;

storiesOf('TextArea', module).addWithChapters('Just TextArea', {
    chapters: [
        {
            sections: [
                {
                    title: 'Default',
                    sectionFn: withDecorator(
                        <TextArea 
                            onChange={onChange} 
                            placeholder='Please describe the work you have done'
                        />
                        
                    )
                },
                {
                    title: 'Disabled',
                    sectionFn: withDecorator(
                        <TextArea
                            onChange={onChange}
                            placeholder='Please describe the work you have done'
                            disabled={true}
                            label='Title'
                        />

                    )
                },
            ]
        }
    ]
});
