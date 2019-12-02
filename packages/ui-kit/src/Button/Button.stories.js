/* eslint-disable */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Button, ButtonWithProgress } from './';

const onClick = action('button clicked!');

const stories = storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addWithChapters('Default', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: () => <Button onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "Small",
            sectionFn: () => <Button size="sm" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "With spinner",
            sectionFn: () => <ButtonWithProgress loading={boolean('loading', true)} onClick={onClick}>Add Employee</ButtonWithProgress>,
          },
          {
            title: "Disabled",
            sectionFn: () => <Button onClick={onClick} disabled>Add Employee</Button>,
          }
        ]
      }
    ]
  })
  .addWithChapters('Transparent', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: () => <Button use="transparent" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "Small",
            sectionFn: () => <Button use="transparent" size="sm" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "With spinner",
            sectionFn: () => <ButtonWithProgress use="transparent" loading={boolean('loading', true)} onClick={onClick}>Add Employee</ButtonWithProgress>,
          },
          {
            title: "Disabled",
            sectionFn: () => <Button use="transparent" disabled onClick={onClick}>Add Employee</Button>
          }
        ],
      }
    ]
  })
  .addWithChapters('Grey', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: () => <Button use="grey" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "Small",
            sectionFn: () => <Button use="grey" size="sm" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "With spinner",
            sectionFn: () => <ButtonWithProgress use="grey" loading={boolean('loading', true)} onClick={onClick}>Add Employee</ButtonWithProgress>,
          },
          {
            title: "Disabled",
            sectionFn: () => <Button use="grey" disabled onClick={onClick}>Add Employee</Button>
          }
        ],
      }
    ]
  })
  .addWithChapters('Danger', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: () => <Button use="danger" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "Small",
            sectionFn: () => <Button use="danger" size="sm" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "With spinner",
            sectionFn: () => <ButtonWithProgress use="danger" loading={boolean('loading', true)} onClick={onClick}>Add Employee</ButtonWithProgress>,
          },
          {
            title: "Disabled",
            sectionFn: () => <Button use="danger" disabled onClick={onClick}>Add Employee</Button>
          }
        ],
      }
    ]
  })
  .addWithChapters('Primary', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: () => <Button use="primary" onClick={onClick}>Add Employee</Button>,
          },
        ],
      }
    ]
  })
  .addWithChapters('Grey Filled', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: () => <Button use="grey-filled" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "Small",
            sectionFn: () => <Button use="grey-filled" size="sm" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "With spinner",
            sectionFn: () => <ButtonWithProgress use="grey-filled" loading={boolean('loading', true)} onClick={onClick}>Add Employee</ButtonWithProgress>,
          },
          {
            title: "Disabled",
            sectionFn: () => <Button use="grey-filled" disabled onClick={onClick}>Add Employee</Button>
          }
        ],
      }
    ]
  })
  .addWithChapters('Simple (small)', {
    chapters: [
      {
        sections: [
          {
            title: "Idle",
            sectionFn: () => <Button use="simple" size="sm" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "Disabled",
            sectionFn: () => <Button use="simple" size="sm" disabled onClick={onClick}>Add Employee</Button>
          }
        ],
      }
    ]
  })