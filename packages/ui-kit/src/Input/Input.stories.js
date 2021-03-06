/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from '.';

const onChange = action('Input value changed!');

const withDecorator = node => () => <div style={{ width: '50%' }}>{node}</div>

storiesOf('Input', module)
  .addWithChapters('Text input', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" onChange={onChange} />),
          },
          {
            title: "size=sm",
            sectionFn: withDecorator(<Input label="This is a label" value="Some value" size="sm" onChange={onChange} />),
          },
          {
            title: "With Label and Prefix",
            sectionFn: withDecorator(<Input label="This is a label" prefix={`${window.location.origin}/`} onChange={onChange} />),
          },
          {
            title: "Error state",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" error onChange={onChange} />),
          },
          {
            title: "Disabled",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" onChange={onChange} disabled />),
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
            sectionFn: withDecorator(<Input placeholder="Placeholder text" use="borderless" onChange={onChange} />),
          },
          {
            title: "With Label and Prefix",
            sectionFn: withDecorator(<Input label="This is a label" use="borderless" prefix={`${window.location.origin}/`} onChange={onChange} />),
          },
          {
            title: "Error state",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" use="borderless" error onChange={onChange} />),
          },
          {
            title: "Disabled",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" use="borderless" onChange={onChange} disabled />),
          }
        ]
      }
    ]
  })
  .addWithChapters('Clearable', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: withDecorator(<Input placeholder="Placeholder text" onClearClick={action('clear clicked!')} clearable onChange={onChange} />),
          },
        ]
      }
    ]
  })
  .addWithChapters('With icon', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: withDecorator(
              <Input 
                placeholder="Placeholder text" 
                icon={<i className="icon-search" />}
                onClearClick={action('clear clicked!')} 
                value="some value"
                clearable 
                onChange={onChange}
              />
            ),
          },
        ]
      }
    ]
  })
  .addWithChapters('With mask', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: withDecorator(
              <Input 
                mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                placeholder="Placeholder text" 
                icon={<i className="icon-search" />}
                onClearClick={action('clear clicked!')} 
                value="9837777983"
                clearable 
                onChange={onChange}
              />
            ),
          },
        ]
      }
    ]
  })
