/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
// @flow
import React, { type Node } from 'react';
import ReactDOM from 'react-dom';


type Props = {
  children: Node
}

class ToastContainer extends React.Component<Props> {
  el: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.el = document.createElement('el');
  }

  componentDidMount() {
    const { body } = document;
    if (!body) return;
    body.appendChild(this.el);
  }

  componentWillUnmount() {
    const { body } = document;
    if (!body) return;
    body.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(
      children,
      this.el,
    );
  }
}

export default ToastContainer;
