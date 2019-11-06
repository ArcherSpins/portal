// @flow

import * as React from 'react';
import {
  Container,
  Modal,
  Title,
  Message,
  CanselButton,
  SaveButton,
} from './styled';
import './style.scss';

type ModalProps = {
  canselFunc: () => void,
  saveFunc: () => void
}

export default ({ canselFunc, saveFunc }: ModalProps): React.Node => (
  <Container className="modal-approve">
    <Modal>
      <Title>Delete Deal</Title>
      <Message>Are you sure you want to delete?</Message>
      <CanselButton onClick={canselFunc}>Cancel</CanselButton>
      <SaveButton onClick={saveFunc}>Delete</SaveButton>
    </Modal>
  </Container>
);
