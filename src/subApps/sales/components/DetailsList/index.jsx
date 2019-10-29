/* eslint-disable import/no-cycle */
// TODO: FIX THIS
// @flow

import React from 'react';
import dayjs from 'dayjs';
import {
  Input,
  Combobox,
  IconInput,
} from 'ui-kit';
import {
  Header,
  FieldBlock,
  Label,
  Button,
  TabsComponent,
  // ToggleChangeComponent,
  // SelectValid,
} from './styled';
import { ModalMessage } from '../index';
// import notImage from '../../assets/not_image.png';
import type { DetailsListProps, PropsType } from './type';
import './style.scss';


const DetailsList = ({
  props,
  state,
  changeInput,
  newContact,
  // editImage,
  closeEdit,
  onSubmitEdit,
  // deleteContact,
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

  // const [tabIndex, toggleTabIdx] = useState(0);

  const toggleTabIndex = (idx) => {
    // toggleTabIdx(idx);
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


  const dateDetailsList = activeUser.createdAt ? dayjs(activeUser.createdAt).format('DD MMMM YYYY hh:mm') : '';
  console.log(data);
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
              loadOptions={loadOptionsManagers}
              onChange={(value) => changeInput('manager', value, null, value)}
              label="Sales"
              selectedOption={data.manager && {
                ...data.manager,
                value: data.manager.name,
                label: data.manager.name,
              }}
              placeholder="Manager name"
            />
          </FieldBlock>
          <FieldBlock className="field">
            {/* <Input
              className="pl-0"
              onChange={(e) => changeInput('contact', e.target.value)}
              use="borderless"
              value={data.contact}
              // error={errorsFormCreate.client.error}
              name="contact"
              label="Contact"
              placeholder="Contact"
            /> */}
            <div
              className="d-flex justify-content-end align-items-center"
            >
              {/* <Label>Contact</Label> */}
              <button
                type="button"
                onClick={newContact}
                className="add-button"
              >
                +
              </button>
            </div>
            {
              contacts.map((item) => (
                <div key={item.id} className="contact-container" style={{ marginBottom: 6 }}>
                  <IconInput
                    className="pl-0"
                    onChange={(e) => changeInput('contact', e.target.value, item.id)}
                    use="borderless"
                    icon={<i className="icon-ellipsis" />}
                    value={item.value}
                    label="Contact"
                    // error={errorsFormCreate.client.error}
                    name="contact"
                    placeholder="Contact"
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
            />
          </FieldBlock>
          <FieldBlock className="field">
            <Label className="mb-10">Source</Label>
            <TabsComponent
              tabs={Array.isArray(sources) && sources.map((item) => item.title)}
              toggleTabIndex={toggleTabIndex}
            >
              <div className="tab-block-content">
                <div className="field">
                  <Input
                    className="pl-0"
                    onChange={(e) => changeInput('source', e.target.value, 'jobPostingURL', 'upwork')}
                    use="borderless"
                    value={data.jobPostingURL}
                    error={errorsFormCreate.jobPostingURL.error}
                    name="jobPostingURL"
                    label="Job Posting URL"
                    require
                    placeholder="Job Posting URL"
                  />
                </div>
                {/* <ToggleChangeComponent
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
                /> */}
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
                    require
                  />
                </div>
                {/* <ToggleChangeComponent
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
                /> */}
              </div>
              <div className="tab-block-content" style={{ display: 'none' }}>
                <div className="field">
                  <Input
                    className="pl-0"
                    onChange={(e) => changeInput('source', e.target.value, 'salesURL', 'upwork')}
                    use="borderless"
                    value={data.salesURL}
                    error={errorsFormCreate.jobProposalURL.error}
                    name="salesURL"
                    label="Messages"
                    placeholder="Sales URL"
                    require
                  />
                </div>
                {/* <ToggleChangeComponent
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
                /> */}
                <div className="field">
                  <Input
                    className="pl-0"
                    onChange={(e) => changeInput('source', e.target.value, 'messagesURL', 'upwork')}
                    use="borderless"
                    value={data.messagesURL}
                    error={errorsFormCreate.jobProposalURL.error}
                    name="messagesURL"
                    label="Sales"
                    placeholder="Messages URL"
                    require
                  />
                </div>

                {/* <ToggleChangeComponent
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
                /> */}
              </div>
              <div className="tab-block-content" style={{ display: 'none' }} />
            </TabsComponent>
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
              error={errorsFormCreate.status.error}
            />
            {/* <Label className="mb-10">Deal status</Label> */}
            {/* <SelectValid
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
            /> */}
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
