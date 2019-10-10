// @flow
import React from 'react';

import './pagination.styles.scss';
import Pagination from 'react-js-pagination';

type Props = {
  activePage: number,
  totalItemsCount: number,
  itemsCountPerPage: number,
  onChange: (pageNumber: number) => void
};

const PaginationComponent = ({
  activePage, totalItemsCount, itemsCountPerPage, onChange,
}: Props) => (
  <Pagination
    prevPageText="Prev"
    nextPageText="Next"
    lastPageText="Last"
    firstPageText="First"
    hideFirstLastPages
    innerClass="pagination"
    itemClass="page-number"
    linkClass="link"
    activeClass="active-page"
    activePage={activePage}
    totalItemsCount={totalItemsCount}
    itemsCountPerPage={itemsCountPerPage}
    onChange={onChange}
  />
);

export default PaginationComponent;
