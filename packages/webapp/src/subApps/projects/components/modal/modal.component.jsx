/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
// TODO: FIX THIS
// @flow
import React from 'react';

import './modal.styles.scss';

type Props = {
  show: boolean,
  children: string,
  object: string,
  close: () => void,
  func: () => void
};

const Modal = (props: Props) => (
  <div>
    <div
      className="modal-wrapper"
      style={{
        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      <div className="modal-header">
        <h3>
Delete
          {props.object}
        </h3>
      </div>
      <div className="modal-body">
        <p>{props.children}</p>
      </div>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={props.close}>
            Close
        </button>
        <button className="btn-continue" onClick={() => props.func()}>
            Delete
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
