/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconInput from 'ui-kit/IconInput';

const onChange = action('Input value changed!');

const withDecorator = node => () => <div style={{ width: '50%' }}>{node}</div>

storiesOf('IconInput', module)
  .addWithChapters('IconInput', {
    chapters: [
      {
        sections: [
          {
            title: "Idle with icon-cancel",
            sectionFn: withDecorator(
              <IconInput placeholder="Placeholder text" icon={<i className="icon-cancel" />} onChange={onChange} />
            ),
          },
          {
            title: "size=sm",
            sectionFn: withDecorator(
              <IconInput label="This is a label"  icon={<i className="icon-right-dir" />} value="Some value" size="sm" onChange={onChange} />
            ),
          },
          {
            title: "With Label and Prefix",
            sectionFn: withDecorator(
              <IconInput label="This is a label" prefix={`${window.location.origin}/`} onChange={onChange} />
            ),
          },
          {
            title: "Error state",
            sectionFn: withDecorator(
              <IconInput placeholder="Placeholder text" icon={<i className="icon-cancel" />} error onChange={onChange} />
            ),
          },
          {
            title: "Disabled",
            sectionFn: withDecorator(<IconInput placeholder="Placeholder text" onChange={onChange} disabled />),
          }
        ]
      }
    ]
  })
