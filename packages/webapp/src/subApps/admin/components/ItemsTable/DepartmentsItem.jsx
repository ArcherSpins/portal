// @flow
import React from 'react';
// import { Link } from 'react-router-dom';
import {
  ItemList,
  DepartmentItem,
  DepartHeader,
  DepartSubTitle,
  PositionList,
  PositionItem,
  EmployeesItem,
} from './styled';
import type { Employees, Position } from '../../types';

type DataType = {
  countEmployees: number,
  employees: Array<Employees>,
  id: string | number,
  manager: Employees | null,
  positions: Array<Position>,
  title: string
}

type ItemProps = {
  data: DataType
}

function checkPositionEmployees(pos: Array<Position>, em: Array<Employees>) {
  const arr = [];
  pos.forEach((item) => {
    if (em.find((e) => {
      if (e.position) {
        if (e.position.id === item.id) {
          return e;
        }
      }
      return false;
    }) && !arr.find((e) => e.id === item.id)) {
      arr.push(item);
    }
  });

  return arr;
}

function checkPosition(data: DataType) {
  if (data.employees.length === 0 || data.positions.length === 0) {
    return <PositionItem>Not positions</PositionItem>;
  }

  return (
    <PositionList>
      {
        checkPositionEmployees(data.positions, data.employees).map((item) => (
          <PositionItem key={item.id}>{item.title}</PositionItem>
        ))
      }
    </PositionList>
  );
}

function checkEmployees(data: DataType) {
  if (data.employees.length !== 0 && data.positions.length !== 0) {
    const listPos = {};
    const positions: Array<Position> = checkPositionEmployees(data.positions, data.employees);
    positions.forEach((item) => {
      listPos[item.id] = data.employees.filter((e) => e.position.id === item.id);
    });

    if (Object.values(listPos).length !== 0) {
      return Object.entries(listPos).map((arr) => (
        <EmployeesItem key={String(arr[0])}>
          {/* $FlowFixMe */}
          { arr[1].map((item) => item.name).join(', ') }
        </EmployeesItem>
      ));
    }

    return 'Not employees';
  }

  return 'Not employees';
}

export default ({
  data,
}: ItemProps) => (
  <ItemList>
    <DepartmentItem width="15%">
      <DepartHeader>Analytics</DepartHeader>
      <DepartSubTitle>
        {`${data.countEmployees} employees`}
      </DepartSubTitle>
    </DepartmentItem>
    <DepartmentItem width="15%">
      <PositionList>
        {checkPosition(data)}
      </PositionList>
    </DepartmentItem>
    <DepartmentItem width="30%">
      {checkEmployees(data)}
    </DepartmentItem>
    <DepartmentItem width="15%">
      {data.manager ? data.manager.name : 'Not Chief'}
    </DepartmentItem>
    <DepartmentItem width="15%">{data.title}</DepartmentItem>
  </ItemList>
);
