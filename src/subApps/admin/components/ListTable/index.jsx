// @flow
import React, { type Node } from 'react';
import { ListContainer, ListHeader, ListContent } from './styled';

type ListTableProps = {
  Header: Node | any,
  ItemComponent: Node | any,
  propsItem: {
    [string]: string | number | null
  },
  data: Array<{
    [string]: mixed
  }>,
  headerProps?: {
    [string]: string | number | null
  },
  style?: {
    [string]: string | number | null
  },
}

const ListTable = ({
  Header,
  ItemComponent,
  propsItem,
  headerProps,
  data,
  style,
}: ListTableProps) => (
  <ListContainer style={style}>
    <ListHeader>
      {/* $FlowFixMe */}
      <Header {...headerProps} />
    </ListHeader>
    <ListContent>
      {
        data.map((item, i) => (
          // $FlowFixMe
          <ItemComponent key={item.id || i} data={item} {...propsItem} />
        ))
      }
    </ListContent>
  </ListContainer>
);

ListTable.defaultProps = {
  headerProps: {},
  style: {},
};

export default ListTable;
