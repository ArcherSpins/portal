import styled from 'styled-components';
import React, { useState } from 'react';
import Select from 'react-select';
import { Switcher, IconInput } from 'ui-kit';
import {
  mail,
  phone,
  linked,
  skype,
} from '../../assets/icons';
import './style.scss';

export const Header = styled.header`
    border-bottom: 1px solid #E5E5E5;
    padding: 10px;
    height: 42px;
`;

export const Label = styled.label`
    display: block;
    color: gray;
    font-size: 14px !important;
`;

export const FieldBlock = styled.div`
    margin-bottom: 15px;
    label {
      color: rgba(51, 51, 51, 0.5);
    }

    * {
      font-size: 16px;
      font-family: Proxima Nova;
    }

    p, input {
      color: #333333;
    }
`;

export const Button = styled.button`
    background: #61B16F;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    border-radius: 4px;
    color: white;
    height: 33px;
    padding: 0 30px;
    cursor: pointer;
`;

// @flow
type SelectComponentProps = {
  data: Array<{id: string, title: string}>,
  onChange: (string, any) => {},
  id: string,
  className: string | null,
  activeUser: Object
}

export const SelectComponent = ({
  data,
  className,
  onChange,
  activeUser,
}: SelectComponentProps) => {
  const options = data.map((item) => ({
    id: item.id,
    label: item.title,
    value: item.title,
  }));

  let titleValue = '';
  let titleId = '';
  if (activeUser) {
    if (activeUser.stage) {
      titleValue = activeUser.stage.title;
      titleId = activeUser.stage.id;
    }
  }

  return (
    <Select
      value={{
        label: titleValue,
        value: titleValue,
        id: titleId,
      }}
      onChange={(selected) => {
        onChange(activeUser.id, selected);
      }}
      className={className}
      options={options}
    />
  );
};

export const SelectComponentChannel = ({
  data,
  onChange,
  id,
  activeUser,
  className,
}: SelectComponentProps) => {
  const options = data.map((item) => ({
    id: item.id,
    label: item.title,
    value: item.title,
  }));

  return (
    <Select
      value={{
        id: activeUser.channel ? activeUser.channel.id : '',
        label: activeUser.channel ? activeUser.channel.title : '',
        value: activeUser.channel ? activeUser.channel.title : '',
      }}
      onChange={(selected) => {
        onChange(id, selected);
      }}
      className={`option-edit-select ${className || ''}`}
      options={options}
    />
  );
};

type ItemIconProps = {
  text: string,
  icon: any,
  toggleEditActive: () => {}
}

export const ItemIcon = ({ text, icon, toggleEditActive }: ItemIconProps) => (
  <div
    onDoubleClick={toggleEditActive}
    className="d-flex justify-content-between align-items-center"
  >
    <p>{text}</p>
    {
      icon ? <img src={icon} alt="icon" style={{ marginBottom: '13px' }} />
        : null
    }

  </div>
);

type TabsComponentProps = {
  children: React.Node,
  tabs: Array<string>,
  toggleTabIndex: (string | number) => void,
  activeTab: string
}

export const TabsComponent = ({
  children, tabs, toggleTabIndex, activeTab,
}: TabsComponentProps) => {
  const [active, onChangeTab] = useState(activeTab || tabs[0]);

  const toggleTab = (id) => {
    const blocks = document.querySelectorAll('.tab-block-content');

    for (let idx = 0; idx < tabs.length; idx += 1) {
      blocks[idx].style.display = 'none';
    }
    blocks[id].style.display = 'block';
    toggleTabIndex(id);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-buttons d-flex justify-content-between mb-10">
        <Switcher
          className="switcher"
          items={tabs}
          value={active}
          onChange={(s) => {
            onChangeTab(s);
            toggleTab(tabs.findIndex((item) => item === s));
          }}
        />
      </div>

      <div>{children}</div>
    </div>
  );
};

type ModalSittingsContactProps = {
  deleteContact: (any, number) => {},
  id: number,
  editImage: (any, number, any, number) => {},
  index: number,
  deleteButton: Boolean,
}

export const ModalSittingsContact = ({
  deleteContact, id, editImage, index, deleteButton,
}: ModalSittingsContactProps) => (
  <div className="modal-right">
    <div
      className="d-flex p-10 border-bottom align-items-center"
      style={{ justifyContent: 'space-between' }}
    >
      <button
        onClick={(e) => editImage(e, id, skype, index)}
        className="transparent"
        type="button"
      >
        <img src={skype} alt="icon" />
      </button>
      <button
        onClick={(e) => editImage(e, id, linked, index)}
        className="transparent"
        type="button"
      >
        <img src={linked} alt="icon" />
      </button>
      <button
        onClick={(e) => editImage(e, id, mail, index)}
        className="transparent"
        type="button"
      >
        <img src={mail} alt="icon" />
      </button>
      <button
        onClick={(e) => editImage(e, id, phone, index)}
        className="transparent"
        type="button"
      >
        <img src={phone} alt="icon" />
      </button>
    </div>
    {
      deleteButton ? (
        <div className="p-10">
          <button
            className="transparent delete-span"
            onClick={(e) => deleteContact(e, String(id))}
            type="button"
          >
              Delete contact
          </button>
        </div>
      ) : null
    }
  </div>
);

type ContactBlockProps = {
  item: {
    id: number,
    value: string,
  },
  changeInput: (string, any, number) => {},
  deleteContact: () => {},
  editImage: () => {},
  index: number,
  deleteButton: Boolean,
  inputProps: {
    [string]: mixed
  }
}

export const ContactBlock = ({
  deleteContact, editImage, index, deleteButton, item, ...inputProps
}: ContactBlockProps) => {
  const [modal, func] = React.useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    func(true);
  };

  // FIXME: $FlowFixMe
  document.addEventListener('click', (e) => {
    const className = e.target.classList;
    if (!className.contains('modal-right-button')
        && !className.contains('icon-ellipsis')
        && !className.contains('delete-span')) {
      func(false);
    }
  });

  return (
    <div className="mb-5 position-relative">
      <IconInput
        className={`input-icon_${item.id}`}
        onIconClick={toggleModal}
        classNameButton="modal-right-button"
        {...inputProps}
      />
      {
        modal ? (
          <ModalSittingsContact
            index={index}
            editImage={editImage}
            deleteContact={deleteContact}
            id={item.id}
            deleteButton={deleteButton}
          />
        )
          : null
      }
    </div>
  );
};

// toggle block

type ToggleChangeComponentProps = {
  status: Boolean,
  error: {
    status?: Boolean,
    message?: String,
  },
  changeBlock: {
    label: String,
    require?: Boolean,
    className?: String,
    value: String,
    onChange: (string, any, string, string) => {},
    idx: String,
    tabName: String,
    name: String,
    id?: String,
  },
  presBlock: {
    label: String,
    className?: String,
    activated: (any, string) => {},
    url?: String,
    value: String,
    idx: String,
  }
}

export const ToggleChangeComponent = ({
  status, presBlock, changeBlock, error = {},
}: ToggleChangeComponentProps) => {
  if (status) {
    return (
      <div className="mb-20">
        <label htmlFor="changeBlock.id" className="d-block mb-5">
          {changeBlock.label}
          :
        </label>
        <input
          required={changeBlock.require}
          id={changeBlock.id}
          onChange={(e) => {
            changeBlock.onChange(
              changeBlock.idx, e.target.value, changeBlock.name, changeBlock.tabName,
            );
          }}
          className={`input-edit ${changeBlock.className}`}
          value={changeBlock.value}
        />
        {
          error.status ? <span className="error-text">{error.message}</span>
            : null
        }
      </div>
    );
  }

  return (
    <p
      className="d-flex"
      onDoubleClick={(e) => presBlock.activated(e, presBlock.idx)}
    >
      <span className="mr-10">
        {presBlock.label}
        :
      </span>
      <a
        className={presBlock.className}
        href={presBlock.url || presBlock.value}
      >
        {presBlock.value}
      </a>
    </p>
  );
};


type ToggleBlockProps = {
  edit: Boolean,
  id: String,
  editProps: {
    className?: String,
    onChange: (any, any) => {},
    value: String,
    error?: Boolean,
    errorMessage?: String,
  },
  prevProps: {
    name: String,
    doubleClick: (any, any) => {},
  }
}

export const ToggleBlock = ({
  edit, editProps, prevProps, id,
}: ToggleBlockProps) => {
  if (edit) {
    return (
      <div>
        <input
          required
          className={`input-edit ${editProps.className} ${!editProps.error && 'mb-10'}`}
          onChange={(e) => editProps.onChange(e.target.id, e.target.value)}
          id={id}
          value={editProps.value}
        />
        {
          editProps.error && (
            <span className="error-text">{editProps.errorMessage}</span>
          )
        }
      </div>
    );
  }

  return (
    <p onDoubleClick={(e) => prevProps.doubleClick(e, id)}>
      {prevProps.name}
    </p>
  );
};


type SelectValidProps = {
  className: string,
  error: boolean,
  id: string,
  onChange: (any) => {},
  options: [],
  errorMessage: String,
  selectedId: String,
}


export const SelectValid = ({
  className,
  error,
  id,
  onChange,
  options,
  errorMessage,
  selectedId,
}: SelectValidProps) => ((
  <div>
    <select
      className={`toggle-select ${className || ''} ${error && 'error'}`}
      id={id}
      onChange={onChange}
    >
      {
        Array.isArray(options) && options.map((item) => (
          <option
            key={item.id}
            value={item.id}
            selected={item.id === selectedId}
          >
            {item.title}
          </option>
        ))
      }
    </select>
    {
      error ? (
        <span className="error-text">{errorMessage}</span>
      ) : null
    }
  </div>
));
