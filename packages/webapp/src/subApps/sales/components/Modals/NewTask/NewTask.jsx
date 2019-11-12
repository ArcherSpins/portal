// @flow
import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  H1,
  Dropdown,
  TextArea,
  Button,
  Datepicker,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import {
  CloseButton,
  DealNameBlock,
  DealNameLabel,
  DealNameContainer,
  EditButton,
} from './styled';
import EditComment from './EditComment';
import InputsCouple from '../../InputsCouple';
import pencilIcon from './pencil.svg';
import './style.scss';


const createTestAttr = createTestContext('modal');


const optionsArray = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onCreate: () => void
}

export default ({
  isOpen,
  onClose,
  onCreate,
}: Props) => (
  <Modal
    show={isOpen}
    onRequestClose={onClose}
    className="big-modal text-left header_d-block footer_d-flex footer_content-end"
  >
    <ModalHeader>
      <H1 className="fz-24 d-flex align-items-center">
        <span className="mr-10">New Task</span>
        <EditButton
          dataTest={createTestAttr('edit-button')}
        >
          <img src={pencilIcon} alt="pencil icon" />
        </EditButton>
      </H1>
      <CloseButton
        onClick={onClose}
        dataTest={createTestAttr('close-button')}
      >
        <i className="icon-cancel" />
      </CloseButton>
    </ModalHeader>
    <ModalBody>
      <div>
        <div className="d-flex justify-content-between pt-20">
          <div className="color-gray col-6">
            <div className="mb-20">
              <DealNameContainer>
                <DealNameLabel>Deal Name</DealNameLabel>
                <DealNameBlock>Blockchain development</DealNameBlock>
              </DealNameContainer>
            </div>
            <div className="mb-20 fz-14 col-6 borderless">
              <Datepicker label="Date" />
              {/* <Dropdown
                label="Date"
                options={optionsArray}
                use="default"
                value={optionsArray[1]}
              />
              <CloseButton>
                <i className="icon-calendar" />
              </CloseButton> */}
            </div>
            <InputsCouple dataTest={createTestAttr('inputs-couple')} />
          </div>
          <div className="col-6 fz-14">
            <div className="mb-2 dropdown_not-padding">
              <Dropdown
                label="Task type"
                options={optionsArray}
                use="borderless"
                value={optionsArray[1]}
                dataTest={createTestAttr('task-type')}
              />
            </div>
            <div className="color-gray">
              <TextArea
                className="fz-14 comment-parent"
                label="Comment"
                placeholder="Task comment"
                onChange={() => null}
                dataTest={createTestAttr('comment-text')}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button dataTest={createTestAttr('close-button')} onClick={onCreate}>Create</Button>
        </div>
      </div>
      <EditComment value="" />
    </ModalBody>
  </Modal>
);
