/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow
import React, { useState } from 'react';
import Select from 'react-select';
import { Picker } from '..';
import type { FilterBlockProps } from './type';
import './style.scss';

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

  const optionsStatuses = [];
  const optionsManagers = [];

  for (let i = 0; i < statuses.length; i += 1) {
    optionsStatuses.push({
      label: statuses[i].title,
      value: statuses[i].title,
      id: statuses[i].id,
    });
  }

  for (let i = 0; i < managers.length; i += 1) {
    optionsManagers.push({
      label: managers[i].name,
      value: managers[i].name,
      id: managers[i].id,
    });
  }

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
        <label htmlFor="deal">Deal Title</label>
        <input
          id="deal"
          value={filterObject.deal}
          onChange={(e) => {
            changeFilter(e.target.id, e.target.value);
          }}
          className="big"
          placeholder="Not specified"
        />
      </div>
      <div className="field-block">
        <label htmlFor="client">Client Name</label>
        <input
          id="client"
          value={filterObject.client}
          onChange={(e) => {
            changeFilter(e.target.id, e.target.value);
          }}
          placeholder="Not specified"
        />
      </div>
      <div className="date-block field-block">
        <label htmlFor="date">Date</label>
        <div
          className="d-flex align-items-center justify-content-center date-double-block"
        >
          <div className="field-block">
            <Picker
              startDate={date}
              handleChange={(dateRes) => changeFilter('start', dateRes)}
            />
          </div>
          <span className="tag"> - </span>
          <div className="field-block">
            <Picker
              startDate={endDate}
              handleChange={(dateRes) => {
                changeFilter('end', dateRes);
              }}
            />
          </div>
        </div>
      </div>
      <div className="field-block">
        <label htmlFor="status">Status</label>
        <Select
          styles={customStyles}
          value={data.status}
          onChange={changeStatus}
          className="select-details small"
          options={optionsStatuses}
          id="status"
        />
      </div>
      <div className="field-block">
        <label htmlFor="manager">Manager</label>
        <Select
          styles={customStyles}
          value={data.manager}
          onChange={changeManager}
          className="select-details big"
          options={optionsManagers}
          id="manager"
        />
      </div>
      <div className="field-block">
        <button
          type="button"
          onClick={submitFilter}
          className="search-button"
        >
          Search
        </button>
      </div>
    </div>
  );
};

const DefExp = () => {};

export {
  FilterBlock,
  DefExp,
};
