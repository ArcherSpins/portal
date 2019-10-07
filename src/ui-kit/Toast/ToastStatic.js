/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

class ToastStatic {
  static push(notification: string) {
    if (!this.node) {
      const { body } = document;

      if (!body) {
        throw Error('There is no "body" element in "document"');
      }

      this.node = document.createElement('div');

      body.appendChild(this.node);

      ReactDOM.render(
        <Toast ref={(el) => (ToastStatic.instance = el)} />,
        ToastStatic.node,
        () => ToastStatic._push(notification),
      );
    } else {
      ToastStatic._push(notification);
    }
  }

  static _push = (notification: string) => {
    if (ToastStatic.instance) {
      ToastStatic.instance.push(notification);
    }
  };

  static close = () => {
    if (ToastStatic.instance) {
      ToastStatic.instance.close();
    }
  };

  static node: HTMLDivElement;

  static instance: ?Toast = null;
}

export default ToastStatic;
