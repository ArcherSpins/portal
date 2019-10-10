// @flow
import React from 'react';
import { ItemList, Item } from './styled';

type ItemProps = {
  data: {
    name: string,
    id: string | number
  }
}

export default ({
  data,
}: ItemProps) => (
  <ItemList>
    <Item>{data.name}</Item>
    <Item>{data.name}</Item>
    <Item>{data.name}</Item>
    <Item>{data.name}</Item>
  </ItemList>
);
