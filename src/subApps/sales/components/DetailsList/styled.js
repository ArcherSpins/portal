import styled from 'styled-components';
import * as React from 'react';
import Select from 'react-select';
import {
  mail,
  phone,
  linked,
  skype,
} from '../../assets/icons';
// $FlowFixMe
import sitting from './notIcon.svg';

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
  tabs: [],
  toggleTabIndex: (string | number) => void
}

export const TabsComponent = ({ children, tabs, toggleTabIndex }: TabsComponentProps) => {
  const toggleTab = (e, id) => {
    e.preventDefault();
    const tab = e.target;
    const tabsBut = document.querySelectorAll('.tab-button');
    const blocks = document.querySelectorAll('.tab-block-content');
    // FIXME: idx обьявлен выше
    for (let idx = 0; idx < tabsBut.length; idx += 1) {
      tabsBut[idx].classList.remove('active');
      blocks[idx].style.display = 'none';
    }
    tab.classList.add('active');
    // Какой idx тогда сюда приходит?
    blocks[id].style.display = 'block';

    toggleTabIndex(id);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-buttons d-flex justify-content-between mb-10">
        <button
          onClick={(e) => toggleTab(e, 0)}
          className="tab-button active"
          type="button"
        >
          {tabs[0] ? tabs[0].title : 'Loading..'}
        </button>
        <button
          onClick={(e) => toggleTab(e, 1)}
          className="tab-button"
          type="button"
        >
          {tabs[1] ? tabs[1].title : 'Loading..'}
        </button>
        <button
          onClick={(e) => toggleTab(e, 2)}
          className="tab-button"
          type="button"
        >
          {tabs[2] ? tabs[2].title : 'Loading..'}
        </button>
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
    <div className="d-flex justify-content-benween p-10 border-bottom">
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
            onClick={(e) => deleteContact(e, id)}
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
  deleteButton: Boolean
}

export const ContactBlock = ({
  item, changeInput, deleteContact, editImage, index, deleteButton,
}: ContactBlockProps) => {
  const [modal, func] = React.useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    func(true);
  };

  // FIXME: $FlowFixMe
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal-right-button')) {
      func(false);
    }
  });

  return (
    <div className="mb-5 position-relative" key={item.id}>
      <input
        style={{ marginBottom: 0 }}
        required
        onChange={(e) => changeInput('contact', e.target.value, item.id)}
        className="input-edit"
        value={item.value}
      />
      <button
        onClick={toggleModal}
        className="button-icon-input modal-right-button transparent"
        type="button"
      >
        <img className="modal-right-button" src={sitting} alt="icon" />
      </button>
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
