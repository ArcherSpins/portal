/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ModalContainer from 'ui-kit/Modal/ModalContainer.component';

const withDecorator = (node) => () => <div>{node}</div>;


storiesOf('Modal', module).addWithChapters('Just Modal', {
    chapters: [
        {
            sections: [
                {
                    title: 'Default',
                    sectionFn: withDecorator(<ModalContainer />)
                },
            ]
        }
    ]
});
