/* eslint-disable react/no-unused-state */
// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Modal,
  Text,
  CloseButton,
} from './styled';
import './modal.scss';

type AlertMessageProps = {
  error: boolean | null,
  message: string,
  closeModal: () => void
};

export default ({ error, message, closeModal }: AlertMessageProps): Node => (
  <Modal className="animated-modal-top" error={error}>
    <Text>{message}</Text>
    <CloseButton onClick={closeModal}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.58574 7.00008L0.792847 11.793L2.20706 13.2072L6.99995 8.41429L11.7928 13.2072L13.2071 11.793L8.41417 7.00008L13.2071 2.20718L11.7928 0.792969L6.99995 5.58586L2.20706 0.792969L0.792847 2.20718L5.58574 7.00008Z"
          fill="white"
          fillOpacity="0.5"
        />
      </svg>
    </CloseButton>
  </Modal>
);
