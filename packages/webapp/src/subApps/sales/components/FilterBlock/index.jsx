/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow
import React, { useState } from 'react';
// import Select from 'react-select';
import {
  Input,
  Datepicker,
  Dropdown,
  Button,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
// import { Picker } from '..';
import type { FilterBlockProps } from './type';
import './style.scss';

const createTestAttr = createTestContext('filter');

const customStyles = {
  control: (base) => ({
    ...base,
    minHeight: 30,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
};

const FilterBlock = ({
  date,
  endDate,
  // changeDate,
  changeFilter,
  onSubmitFilter,
  filterObject,
  statuses,
  managers,
  idManager,
  idStatus,
}: FilterBlockProps) => {
  const [data, func] = useState({
    status: filterObject.status,
    manager: filterObject.manager,
  });

  const submitFilter = () => {
    onSubmitFilter(data.status, data.manager);
  };

  const changeStatus = (selected) => {
    func({ status: selected, manager: data.manager });
    changeFilter(idStatus || 'status', selected);
  };

  const changeManager = (selected) => {
    func({ status: data.status, manager: selected });
    changeFilter(idManager || 'manager', selected);
  };

  return (
    <div
      className="mb-10 filter-block d-flex justify-content-between align-items-center"
    >
      <div className="field-block">
        <Input
          name="filter-block_deal"
          label="Deal Title"
          onChange={(e) => {
            changeFilter('deal', e.target.value);
          }}
          value={filterObject.deal}
          className="big"
          placeholder="Not specified"
          data-test={createTestAttr('deal-title-input')}
        />
      </div>
      <div className="field-block">
        <Input
          name="filter-block_client"
          label="Client Name"
          onChange={(e) => {
            changeFilter('client', e.target.value);
          }}
          value={filterObject.client}
          placeholder="Not specified"
          data-test={createTestAttr('client-name-input')}
        />
      </div>
      <div className="date-block field-block">
        <div
          className="d-flex align-items-end justify-content-center date-double-block"
        >
          <div className="field-block">
            <Datepicker
              label="Date"
              value={date}
              onDayChange={(dateRes) => changeFilter('start', dateRes)}
              containerProps={{
                'data-test': createTestAttr('datepicker-start'),
              }}
            />
          </div>
          <span className="tag"> - </span>
          <div className="field-block">
            <Datepicker
              value={endDate}
              onDayChange={(dateRes) => {
                changeFilter('end', dateRes);
              }}
              containerProps={{
                'data-test': createTestAttr('datepicker-end'),
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid-field align-items-center pt-6 ml-20">
        <div className="field-block">
          <Dropdown
            styles={customStyles}
            value={data.status}
            onChange={changeStatus}
            className="select-details small"
            options={[
              { title: 'Not select' },
              ...statuses,
            ].map((item) => ({ ...item, label: item.title, value: item.title }))}
            id="status"
            label="Status"
            dataTest={createTestAttr('status-select')}
          />
        </div>
        <div className="field-block">
          <Dropdown
            styles={customStyles}
            value={data.manager}
            onChange={changeManager}
            className="select-details big"
            options={managers.map((item) => ({ ...item, label: item.name, value: item.name }))}
            label="Manager"
            id="manager"
            dataTest={createTestAttr('manager-select')}
          />
        </div>
      </div>
      <div className="field-block">
        <Button
          type="button"
          onClick={submitFilter}
          className="filter-button"
          data-test={createTestAttr('search-button')}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

const DefExp = () => {};

export {
  FilterBlock,
  DefExp,
};
