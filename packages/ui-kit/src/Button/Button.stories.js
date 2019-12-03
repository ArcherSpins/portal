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
            sectionFn: () => (
              <>
                <Button use="transparent" onClick={onClick}>default</Button>
                <Button use="transparent" color="danger" onClick={onClick}>color=danger</Button>
                <Button use="transparent" color="primary" onClick={onClick}>color=primary</Button>
                <Button use="transparent" color="grey" onClick={onClick}>color=grey</Button>
              </>
            ),
          },
          {
            title: "Small",
            sectionFn: () => (
              <>
                <Button use="transparent" size="sm" onClick={onClick}>default</Button>
                <Button use="transparent" size="sm" color="danger" onClick={onClick}>color=danger</Button>
                <Button use="transparent" size="sm" color="primary" onClick={onClick}>color=primary</Button>
                <Button use="transparent" size="sm" color="grey" onClick={onClick}>color=grey</Button>
              </>
            ),
          },
          {
            title: "With spinner",
            sectionFn: () => (
              <>
                <ButtonWithProgress use="transparent" loading={boolean('loading', true)} onClick={onClick}>default</ButtonWithProgress>
                <ButtonWithProgress use="transparent" color="danger" loading={boolean('loading', true)} onClick={onClick}>color=danger</ButtonWithProgress>
                <ButtonWithProgress use="transparent" color="primary" loading={boolean('loading', true)} onClick={onClick}>color=primary</ButtonWithProgress>
                <ButtonWithProgress use="transparent" color="grey" loading={boolean('loading', true)} onClick={onClick}>color=grey</ButtonWithProgress>
              </>
            ),
          },
          {
            title: "Disabled",
            sectionFn: () => (
              <>
                <Button use="transparent" onClick={onClick} disabled>default</Button>
                <Button use="transparent" color="danger" onClick={onClick} disabled>color=danger</Button>
                <Button use="transparent" color="primary" onClick={onClick} disabled>color=primary</Button>
                <Button use="transparent" color="grey" onClick={onClick} disabled>color=grey</Button>
              </>
            ),
          }
        ]
      }
    ]
  })