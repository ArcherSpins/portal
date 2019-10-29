// @flow
import React from 'react';
import { HeaderListDepartment, HeaderItem } from './styled';

export default () => (
  <HeaderListDepartment>
    <HeaderItem width="15%">
      Department
    </HeaderItem>
    <HeaderItem width="15%">
      Position
    </HeaderItem>
    <HeaderItem width="30%">
      Employees
    </HeaderItem>
    <HeaderItem width="15%">
      Chief
    </HeaderItem>
    <HeaderItem width="15%">
      Subordination
    </HeaderItem>
  </HeaderListDepartment>
);
