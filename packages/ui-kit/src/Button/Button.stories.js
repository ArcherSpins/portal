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
            sectionFn: () => (
              <>
                <Button onClick={onClick}>default</Button>
                <Button color="danger" onClick={onClick}>color=danger</Button>
                <Button color="primary" onClick={onClick}>color=primary</Button>
                <Button color="grey" onClick={onClick}>color=grey</Button>
              </>
            ),
          },
          {
            title: "Small",
            sectionFn: () => (
              <>
                <Button size="sm" onClick={onClick}>default</Button>
                <Button size="sm" color="danger" onClick={onClick}>color=danger</Button>
                <Button size="sm" color="primary" onClick={onClick}>color=primary</Button>
                <Button size="sm" color="grey" onClick={onClick}>color=grey</Button>
              </>
            ),
          },
          {
            title: "With spinner",
            sectionFn: () => (
              <>
                <ButtonWithProgress loading={boolean('loading', true)} onClick={onClick}>default</ButtonWithProgress>
                <ButtonWithProgress color="danger" loading={boolean('loading', true)} onClick={onClick}>color=danger</ButtonWithProgress>
                <ButtonWithProgress color="primary" loading={boolean('loading', true)} onClick={onClick}>color=primary</ButtonWithProgress>
                <ButtonWithProgress color="grey" loading={boolean('loading', true)} onClick={onClick}>color=grey</ButtonWithProgress>
              </>
            ),
          },
          {
            title: "Disabled",
            sectionFn: () => (
              <>
                <Button onClick={onClick} disabled>default</Button>
                <Button color="danger" onClick={onClick} disabled>color=danger</Button>
                <Button color="primary" onClick={onClick} disabled>color=primary</Button>
                <Button color="grey" onClick={onClick} disabled>color=grey</Button>
              </>
            ),
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
            sectionFn: () => <Button color="danger"  use="transparent" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "Small",
            sectionFn: () => <Button color="danger"  use="transparent" size="sm" onClick={onClick}>Add Employee</Button>,
          },
          {
            title: "With spinner",
            sectionFn: () => <ButtonWithProgress color="danger"  use="transparent" loading={boolean('loading', true)} onClick={onClick}>Add Employee</ButtonWithProgress>,
          },
          {
            title: "Disabled",
            sectionFn: () => <Button color="danger"  use="transparent" disabled onClick={onClick}>Add Employee</Button>
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