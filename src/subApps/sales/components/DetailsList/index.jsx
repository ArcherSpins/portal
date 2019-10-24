/* eslint-disable import/no-cycle */
// TODO: FIX THIS
/* eslint-disable react/no-unused-state */
// @flow

import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Input,
  Switcher,
  Combobox,
} from 'ui-kit';
import {
  Header,
  FieldBlock,
  Label,
  Button,
  TabsComponent,
  ToggleChangeComponent,
  SelectValid,
} from './styled';
import { ModalMessage } from '../index';
// import notImage from '../../assets/not_image.png';
import type { DetailsListProps, PropsType } from './type';
import './style.scss';


const DetailsList = ({
  props,
  state,
  changeInput,
  // newContact,
  // editImage,
  closeEdit,
  onSubmitEdit,
  // deleteContact,
  setSourceData,
}: DetailsListProps) => {
  const typeProps: PropsType = props;
  const {
    edit,
    activateFormEdit,
    editForm,
    activeUser,
    statuses,
    channels,
    sources,
    managers,
    errorsFormCreate,
    showModalErrorMessage,
    toggleShowModal,
  } = typeProps;
  const {
    data,
    // contacts
  } = state;

  const [tabIndex, toggleTabIdx] = useState(0);

  const toggleTabIndex = (idx) => {
    toggleTabIdx(idx);
    setSourceData(sources[idx]);
  };

  const dateDetailsList = activeUser.createdAt ? dayjs(activeUser.createdAt).format('DD MMMM YYYY hh:mm') : '';

  console.log(managers);

  return (
    <div className="details-column">
      <ModalMessage
        message="jobProposalURL required!!"
        show={showModalErrorMessage}
        statusError
        animate="right"
        toggleModal={toggleShowModal}
      />
      <form style={{ height: '100%' }}>
        <Header className="d-flex justify-content-between align-items-center">
          <h3>Information</h3>
        </Header>
        <div
          className="content custom-scrollbar"
          style={{
            paddingBottom: '20px',
            maxHeight: `calc(100% - ${edit ? '94px' : '42px'})`,
          }}
        >
          <FieldBlock className="field">
            <Input
              className="pl-0"
              label="Client"
              onChange={(e) => changeInput('client', e.target.value)}
              use="borderless"
              value={data.client}
              error={errorsFormCreate.client.error}
              name="client"
              placeholder="Client name"
            />
          </FieldBlock>
          <FieldBlock className="field option-edit-select">
            <Combobox
              use="underlined"
              loadOptions={() => new Promise((resolve) => resolve(managers))}
              onChange={(value) => changeInput('manager', value.id, null, value)}
              label="Sales"
              selectedOption={data.manager}
              placeholder="Manager name"
            />
            {/* <Input
              className="pl-0"
              onChange={(e) => changeInput('manager', e.target.value)}
              use="borderless"
              selectedOption={data.manager}
              // error={errorsFormCreate.client.error}
              name="manager"
              label="Sales"
              placeholder="Manager name"
            /> */}
            {/* <UserPicker
              users={[data.manager]}
              usersJson={managers}
              getUsers={(users: Array<{ id: string }>) => {
                changeInput('manager', users[0].id, null, users[0]);
              }}
              title="Sales"
              deleteUser={(del) => {
                const deleteUs = del;
                return deleteUs;
              }}
              selected={activeUser.manager}
              defaultImage={notImage}
            /> */}
          </FieldBlock>
          <FieldBlock className="field">
            <Input
              className="pl-0"
              onChange={(e) => changeInput('contact', e.target.value)}
              use="borderless"
              value={data.contact}
              // error={errorsFormCreate.client.error}
              name="contact"
              label="Contact"
              placeholder="Contact"
            />
            {/* <div
              className="d-flex justify-content-between align-items-center mb-10"
            >
              <Label>Contact</Label>
              <button
                type="button"
                onClick={newContact}
                className="add-button"
              >
                +
              </button>
            </div>
            {
              contacts.map((item, i) => (
                editForm.contact
                  ? (
                    <ContactBlock
                      index={i}
                      editImage={editImage}
                      key={item.id || i}
                      item={item}
                      deleteContact={deleteContact}
                      changeInput={changeInput}
                      deleteButton={activeUser.id}
                    />
                  )
                  : (
                    <ItemIcon
                      key={item.id || i}
                      toggleEditActive={(e) => activateFormEdit(e, 'contact')}
                      text={item.value}
                      icon={item.img}
                    />
                  )
              ))
            } */}
          </FieldBlock>
          <FieldBlock className="field">
            <Combobox
              use="underlined"
              loadOptions={() => new Promise((resolve) => resolve(channels))}
              onChange={(value) => changeInput('channel', value)}
              label="Channel"
              selectedOption={data.manager}
              placeholder="Channel"
            />
            {/* <Input
              className="pl-0"
              onChange={(e) => changeInput('channel', e.target.value)}
              use="borderless"
              value={data.channel}
              // error={errorsFormCreate.client.error}
              name="channel"
              label="Channel"
              placeholder="Channel"
            /> */}
          </FieldBlock>
          <FieldBlock className="field">
            <Switcher items={['UpWork', 'LinkedIn', 'Direct']} onChange={() => {}} />
            <Label className="mb-10">Source</Label>
            <TabsComponent tabs={sources} toggleTabIndex={toggleTabIndex}>
              <div className="tab-block-content">
                <ToggleChangeComponent
                  status={editForm.source && tabIndex === 0}
                  error={{
                    status: errorsFormCreate.jobPostingURL.error,
                    message: errorsFormCreate.jobPostingURL.message,
                  }}
                  changeBlock={{
                    label: 'Job Posting URL',
                    require: true,
                    value: data.jobPostingURL,
                    onChange: changeInput,
                    idx: 'source',
                    tabName: 'upwork',
                    name: 'jobPostingURL',
                    id: 'jobPostingURL',
                    className: errorsFormCreate.jobPostingURL.error && 'error-border',
                  }}
                  presBlock={{
                    label: 'Job Posting URL',
                    activated: activateFormEdit,
                    value: activeUser.jobPostingURL,
                    idx: 'source',
                  }}
                />

                <ToggleChangeComponent
                  status={editForm.propSource && tabIndex === 0}
                  error={{
                    status: errorsFormCreate.jobProposalURL.error,
                    message: errorsFormCreate.jobProposalURL.message,
                  }}
                  changeBlock={{
                    label: 'Proposal URL',
                    require: true,
                    value: data.jobProposalURL,
                    onChange: changeInput,
                    idx: 'source',
                    tabName: 'upwork',
                    name: 'jobProposalURL',
                    id: 'jobProposalURL',
                    className: errorsFormCreate.jobProposalURL.error && 'error-border',
                  }}
                  presBlock={{
                    label: 'Proposal URL',
                    activated: activateFormEdit,
                    value: activeUser.jobProposalURL,
                    idx: 'propSource',
                  }}
                />
              </div>
              <div className="tab-block-content" style={{ display: 'none' }}>
                <ToggleChangeComponent
                  status={editForm.source && tabIndex === 1}
                  changeBlock={{
                    label: 'Messages',
                    require: true,
                    value: data.salesURL,
                    onChange: changeInput,
                    idx: 'source',
                    tabName: 'upwork',
                    name: 'salesURL',
                  }}
                  presBlock={{
                    label: 'Messages',
                    activated: activateFormEdit,
                    value: activeUser.salesURL,
                    idx: 'source',
                  }}
                />

                <ToggleChangeComponent
                  status={editForm.source && tabIndex === 1}
                  changeBlock={{
                    label: 'Sales',
                    require: true,
                    value: data.messagesURL,
                    onChange: changeInput,
                    idx: 'source',
                    tabName: 'upwork',
                    name: 'messagesURL',
                  }}
                  presBlock={{
                    label: 'Sales',
                    activated: activateFormEdit,
                    value: activeUser.messagesURL,
                    idx: 'source',
                  }}
                />
              </div>
              <div className="tab-block-content" style={{ display: 'none' }} />
            </TabsComponent>
          </FieldBlock>
          <FieldBlock className="field">
            <Label className="mb-10">Deal status</Label>
            <SelectValid
              error={errorsFormCreate.status.error}
              id="status"
              onChange={
                (val) => {
                  const find = statuses.find((item) => item.id === val.target.value);
                  changeInput('status', find);
                }
              }
              options={statuses}
              selectedId={data.stage ? data.stage.id : null}
              errorMessage={errorsFormCreate.status.message}
            />
          </FieldBlock>
          <FieldBlock className="field">
            <Label className="mb-10">Deal date</Label>
            <div className="picker-block block">
              <p>{dateDetailsList}</p>
            </div>
          </FieldBlock>
        </div>
        {
          edit
            ? (
              <footer>
                <div
                  className="d-flex justify-content-between"
                  style={{ padding: '10px' }}
                >
                  <button
                    type="button"
                    style={{ width: '50%' }}
                    className="cancel-button"
                    onClick={closeEdit}
                  >
                    Cancel
                  </button>
                  <Button
                    style={{
                      marginLeft: '3px',
                      width: '50%',
                    }}
                    className="save-button"
                    onClick={onSubmitEdit}
                  >
                    Save
                  </Button>
                </div>
              </footer>
            ) : null
        }
      </form>
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { DetailsList };
