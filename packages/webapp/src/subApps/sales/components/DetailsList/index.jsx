/* eslint-disable import/no-cycle */
// TODO: FIX THIS
// @flow

import React from 'react';
import dayjs from 'dayjs';
import {
  Input,
  Combobox,
  LinkButton,
  Button,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import {
  Header,
  FieldBlock,
  Label,
  TabsComponent,
  ContactBlock,
} from './styled';
import { ModalMessage } from '../index';
// import notImage from '../../assets/not_image.png';
import type { DetailsListProps, PropsType } from './type';
import './style.scss';

const createTestAttr = createTestContext('deal');

const DetailsList = ({
  props,
  state,
  changeInput,
  newContact,
  editImage,
  closeEdit,
  onSubmitEdit,
  deleteContact,
  setSourceData,
}: DetailsListProps) => {
  const typeProps: PropsType = props;
  const {
    edit,
    // activateFormEdit,
    // editForm,
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
    contacts,
  } = state;

  const toggleTabIndex = (idx) => {
    setSourceData(sources[idx]);
  };

  const newManagers = managers.map((item) => ({ ...item, label: item.name, value: item.name }));
  const loadOptionsManagers = (inputValue, callback) => new Promise(() => {
    setTimeout(() => {
      callback(
        newManagers.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
      );
    }, 1500);
  });

  const newChannels = channels.map((item) => ({ ...item, value: item.title, label: item.title }));
  const loadOptionsChannels = (inputValue, callback) => new Promise(() => {
    setTimeout(() => {
      callback(
        newChannels.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
      );
    }, 1500);
  });

  const newStatuses = statuses.map((item) => ({ ...item, value: item.title, label: item.title }));
  const loadOptionsStatuses = (inputValue, callback) => new Promise(() => {
    setTimeout(() => {
      callback(
        newStatuses.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
      );
    }, 1500);
  });

  const sourcesArray: Array<string> = sources.map((item) => item.title);
  const dateDetailsList = activeUser.createdAt ? dayjs(activeUser.createdAt).format('DD MMMM YYYY hh:mm') : '';

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
              data-test={createTestAttr('client-name-input')}
            />
          </FieldBlock>
          <FieldBlock className="field">
            <Combobox
              use="underlined"
              loadOptions={loadOptionsStatuses}
              onChange={(value) => changeInput('status', value)}
              label="Deal status"
              selectedOption={data.stage && {
                ...data.stage,
                value: data.stage.title,
                label: data.stage.title,
              }}
              placeholder="Status"
              dataTest={createTestAttr('status-select')}
              error={errorsFormCreate.status.error}
            />
          </FieldBlock>
          <FieldBlock className="field option-edit-select">
            <Combobox
              use="underlined"
              loadOptions={loadOptionsManagers}
              onChange={(value) => changeInput('manager', value, null, value)}
              label="Sales"
              selectedOption={data.manager && {
                ...data.manager,
                value: data.manager.name,
                label: data.manager.name,
              }}
              placeholder="Manager name"
              dataTest={createTestAttr('sales-select')}
            />
          </FieldBlock>
          <FieldBlock className="field">
            <div
              className="d-flex justify-content-end align-items-center"
            >
              <button
                type="button"
                onClick={newContact}
                className="add-button"
                data-test={createTestAttr('add-button')}
              >
                +
              </button>
            </div>
            {
              contacts.map((item) => (
                <div key={item.id} className="contact-container" style={{ marginBottom: 6 }}>
                  <ContactBlock
                    className="pl-0"
                    onChange={(e) => changeInput('contact', e.target.value, item.id)}
                    use="borderless"
                    icon={<i className="icon-ellipsis" />}
                    value={item.value}
                    label="Contact"
                    // error={errorsFormCreate.client.error}
                    name="contact"
                    placeholder="Contact"
                    editImage={editImage}
                    key={item.id}
                    item={item}
                    deleteContact={deleteContact}
                    deleteButton={activeUser.id}
                  />
                </div>
              ))
            }
          </FieldBlock>
          <FieldBlock className="field">
            <Combobox
              use="underlined"
              loadOptions={loadOptionsChannels}
              onChange={(value) => changeInput('channel', value)}
              label="Channel"
              selectedOption={data.channel && {
                ...data.channel,
                value: data.channel.title,
                label: data.channel.title,
              }}
              placeholder="Channel"
              dataTest={createTestAttr('channel-select')}
            />
          </FieldBlock>
          <FieldBlock className="field">
            <Label className="mb-10">Source</Label>
            <TabsComponent
              tabs={sourcesArray}
              toggleTabIndex={toggleTabIndex}
              activeTab={activeUser.source.title}
            >
              <div
                className="tab-block-content"
                style={{ display: activeUser.source.title !== sourcesArray[0] && 'none' }}
              >
                <div className="field">
                  <Input
                    className="pl-0"
                    onChange={(e) => changeInput('source', e.target.value, 'jobPostingURL', 'upwork')}
                    use="borderless"
                    value={data.jobPostingURL}
                    error={errorsFormCreate.jobPostingURL.error}
                    name="jobPostingURL"
                    label="Job Posting URL"
                    required
                    placeholder="Job Posting URL"
                    data-test={createTestAttr('job-url-input')}
                  />
                </div>
                <div className="field">
                  <Input
                    className="pl-0"
                    onChange={(e) => changeInput('source', e.target.value, 'jobProposalURL', 'upwork')}
                    use="borderless"
                    value={data.jobProposalURL}
                    error={errorsFormCreate.jobProposalURL.error}
                    name="jobProposalURL"
                    label="Proposal URL"
                    placeholder="Proposal URL"
                    required
                    data-test={createTestAttr('proposal-url-input')}
                  />
                </div>
              </div>
              <div
                className="tab-block-content"
                style={{ display: activeUser.source.title !== sourcesArray[1] && 'none' }}
              >
                <div className="field">
                  <Input
                    className="pl-0"
                    onChange={(e) => changeInput('source', e.target.value, 'messagesURL', 'upwork')}
                    use="borderless"
                    value={data.messagesURL}
                    // error={errorsFormCreate.messagesURL.error}
                    name="messagesURL"
                    label="Messages"
                    placeholder="Messages URL"
                    required
                    data-test={createTestAttr('messages-url-input')}
                  />
                </div>
                <div className="field">
                  <Input
                    className="pl-0"
                    onChange={(e) => changeInput('source', e.target.value, 'salesURL', 'upwork')}
                    use="borderless"
                    value={data.salesURL}
                    // error={errorsFormCreate.salesURL.error}
                    name="salesURL"
                    label="Sales manager"
                    placeholder="Sales URL"
                    required
                    data-test={createTestAttr('sales-url-input')}
                  />
                </div>
              </div>
              <div
                className="tab-block-content"
                style={{ display: activeUser.source.title !== sourcesArray[2] && 'none' }}
              />
            </TabsComponent>
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
                  {
                    activeUser.id ? (
                      <Button
                        style={{ width: '50%' }}
                        onClick={closeEdit}
                        data-test={createTestAttr('cancel-button')}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <LinkButton
                        to="/sales"
                        use="transparent"
                        style={{ width: '50%' }}
                        data-test={createTestAttr('cancel-button')}
                      >
                        Cancel
                      </LinkButton>
                    )
                  }
                  <Button
                    style={{
                      marginLeft: '3px',
                      width: '50%',
                    }}
                    onClick={onSubmitEdit}
                    data-test={createTestAttr('save-button')}
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
