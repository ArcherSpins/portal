/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-unused-state */
// @flow
import React, { useEffect } from 'react';
import { Button } from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import arrow from '../../assets/icons/arrow-left.png';
// import { Heading } from '../shared/styled';
import { InputForTitle, Title } from './styled';
import type { HeaderDetailsProps } from './type';
import './style.scss';

const createTestAttr = createTestContext('header');

const HeaderDetails = ({
  title,
  goBack,
  activeUser,
  editTitle,
  toggleActiveTitle,
  titleText,
  changeTitleText,
  deleteDeal,
  errorsFormCreate,
  setTitleComponent,
}: HeaderDetailsProps) => {
  useEffect(() => {
    if (titleText === null) {
      changeTitleText(title);
    }
  });

  const clickDeleteButton = async () => {
    await deleteDeal({
      id: activeUser.id,
    });
  };

  function changeTitleInput(e) {
    // e.target.style.width = ((e.target.value.length + 1) * 15) + 'px';
    changeTitleText(e.target.value);
  }

  return (
    <div className="header-details-crm">
      <div className="left-block">
        <button
          type="button"
          onClick={goBack}
          className="fz-14"
          to="/crm"
          data-test={createTestAttr('go-back-button')}
        >
          <img src={arrow} alt="arrow" />
        </button>
        <div className="block-title fz-14">
          {
            editTitle ? (
              <div>
                <InputForTitle
                  ref={setTitleComponent}
                  onChange={changeTitleInput}
                  value={titleText}
                  style={{ width: `${(titleText.length + 1) * 15}px` }}
                  required
                  className={errorsFormCreate.title.error && 'error-border'}
                  data-test={createTestAttr('title-input')}
                />
                {
                  errorsFormCreate.title.error
                  && (
                    <span
                      className="error-text fz-16"
                    >
                      {errorsFormCreate.title.message}
                    </span>
                  )
                }
              </div>
            )
              : (
                <Title
                  onDoubleClick={() => toggleActiveTitle(true)}
                  title={title}
                  data-test={createTestAttr('title-input')}
                  style={{
                    width: `${(title.length + 1) * 20}px`,
                    minWidth: '500px',
                  }}
                >
                  {title}
                </Title>
              )
          }
        </div>
      </div>
      <div className="right-block fz-14">
        {
          activeUser.id ? (
            <Button
              type="button"
              onClick={clickDeleteButton}
              use="transparent"
              data-test={createTestAttr('delete-button')}
            >
                Delete deal
            </Button>
          )
            : null
        }
      </div>
    </div>
  );
};


export { HeaderDetails };
