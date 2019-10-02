/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from 'ui-kit/Input';

const onChange = action('Input value changed!');

const withDecorator = node => () => <div style={{ width: '50%' }}>{node}</div>

storiesOf('Input', module)
  .addWithChapters('Text input', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" onChange={onChange}>Add Employee</Input>),
          },
          {
            title: "Error state",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" error onChange={onChange}>Add Employee</Input>),
          },
          {
            title: "Disabled",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" onChange={onChange} disabled>Add Employee</Input>),
          }
        ]
      }
    ]
  })
  .addWithChapters('Borderless Text Input', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" use="borderless" onChange={onChange}>Add Employee</Input>),
          },
          {
            title: "Error state",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" use="borderless" error onChange={onChange}>Add Employee</Input>),
          },
          {
            title: "Disabled",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" use="borderless" onChange={onChange} disabled>Add Employee</Input>),
          }
        ]
      }
    ]
  })

