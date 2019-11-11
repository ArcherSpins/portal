/* eslint-disable */
import React from 'react';
// import { action } from '@storybook/addon-actions';
import Toast from './';
import { storiesOf } from '@storybook/react';

storiesOf('Toast', module)
  .addWithChapters('Toast', {
    chapters: [
      {
        info: "Комопонент Toast используется в виде статического класса. Все обязанности по части рендера он берет на себя.",
        sections: [
          {
            title: 'Toast type=danger',
            sectionFn: () => {
              return (
                <button onClick={() => Toast.push({ message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", type: "danger" })}>Click me!</button>
              );
            },
          },
          {
            title: 'Toast type=success',
            sectionFn: () => {
              return (
                <button onClick={() => Toast.push({ message: "Some error text", type: "success" })}>Click me!</button>
              );
            },
          },
          {
            title: 'Toast type=info',
            sectionFn: () => {
              return (
                <button onClick={() => Toast.push({ message: "Some error text", type: "info" })}>Click me!</button>
              );
            },
          },
        ],
      },
    ],
  });
