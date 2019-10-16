/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Description from 'ui-kit/Description';

const onChange = action('Description value changed!');


const withDecorator = (node) => () => <div>{node}</div>;

storiesOf('Description', module).addWithChapters('Just Description', {
    chapters: [
        {
            sections: [
                {
                    title: 'Default',
                    sectionFn: withDecorator(
                        <Description 
                            onChange={onChange} 
                            placeholder='Please describe the work you have done'
                            className='description'
                        />
                        
                    )
                },
            ]
        }
    ]
});
