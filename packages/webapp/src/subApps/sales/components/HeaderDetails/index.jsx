/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-unused-state */
// @flow
import React, { useEffect } from 'react';
import { Button } from '@sfxdx/ui-kit';
import arrow from '../../assets/icons/arrow-left.png';
// import { Heading } from '../shared/styled';
import { InputForTitle, Title } from './styled';
import type { HeaderDetailsProps } from './type';
import './style.scss';

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
