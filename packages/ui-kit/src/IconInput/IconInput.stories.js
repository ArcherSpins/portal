/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconInput from '.';

const onChange = action('Input value changed!');
const onIconClick = action('clicked on icon');

const withDecorator = node => () => <div style={{ width: '50%' }}>{node}</div>

storiesOf('IconInput', module)
  .addWithChapters('IconInput', {
    chapters: [
      {
        sections: [
          {
            title: "Idle with icon-cancel",
            sectionFn: withDecorator(
              <IconInput onIconClick={onIconClick} placeholder="Placeholder text" icon={<i className="icon-cancel" />} onChange={onChange} />
            ),
          },
          {
            title: "size=sm",
            sectionFn: withDecorator(
              <IconInput onIconClick={onIconClick} label="This is a label"  icon={<i className="icon-right-dir" />} value="Some value" size="sm" onChange={onChange} />
            ),
          },
          {
            title: "With Label and Prefix",
            sectionFn: withDecorator(
              <IconInput onIconClick={onIconClick} label="This is a label" prefix={`${window.location.origin}/`} onChange={onChange} />
            ),
          },
          {
            title: "Error state",
            sectionFn: withDecorator(
              <IconInput onIconClick={onIconClick} placeholder="Placeholder text" icon={<i className="icon-cancel" />} error onChange={onChange} />
            ),
          },
          {
            title: "Disabled",
            sectionFn: withDecorator(<IconInput onIconClick={onIconClick} placeholder="Placeholder text" onChange={onChange} disabled />),
          },
          {
            title: "use=borderless",
            sectionFn: withDecorator(
              <IconInput onIconClick={onIconClick} use="borderless" placeholder="Placeholder text" onChange={onChange} icon={<i className="icon-cancel" />} />
            ),
          }
        ]
      }
    ]
  })
