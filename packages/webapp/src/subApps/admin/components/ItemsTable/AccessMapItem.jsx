// @flow
import React from 'react';
import { ItemList, Item } from './styled';

type ItemProps = {
  data: {
    module: string,
    role_name: string,
    role_access: string,
    employee_name: string,
    id: string | number
  }
}

export default ({
  data,
}: ItemProps) => (
  <ItemList>
    <Item>{data.module}</Item>
    <Item>{data.role_name}</Item>
    <Item>{data.role_access}</Item>
    <Item>{data.employee_name}</Item>
  </ItemList>
);
