// @flow
import React from 'react';
import { Wrap } from './styled';
import YearButton from './YearButton';

type Props = {
  changeYear: number => void,
  years: Array<{year: number, selected: boolean}>,
}


const ChooseYear = ({ changeYear, years }: Props) => (
  <Wrap>
    {years.map(({ year, selected }) => (
      <YearButton
        key={year}
        selected={selected}
        year={year}
        changeYear={changeYear}
      />
    ))}
  </Wrap>
);

export default ChooseYear;
