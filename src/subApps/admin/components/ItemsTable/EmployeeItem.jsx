// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { EMPLOYEES_ROUTE } from '../../routes';
import { ItemList, Item } from './styled';
import type { Employees } from '../../types';

type ItemProps = {
  data: Employees
}

export default ({
  data,
}: ItemProps) => (
  <Link style={{ textDecoration: 'none' }} to={`${EMPLOYEES_ROUTE}/${data.id}`}>
    <ItemList>
      <Item>{data.name}</Item>
      <Item>{data.department ? data.department.title : 'Not department'}</Item>
      <Item>{data.position ? data.position.title : 'Not position'}</Item>
      <Item>
        {(data.city.name || 'Not city, ') && (data.city.country || 'not country')}
      </Item>
    </ItemList>
  </Link>
);
