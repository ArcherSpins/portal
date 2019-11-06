// @flow
import React, { PureComponent } from 'react';
import { YearButton } from './styled';

type Props = {
  selected: boolean,
  year: number,
  changeYear: number => void
}

class Button extends PureComponent<Props> {
  setYear = () => {
    const { selected, year, changeYear } = this.props;
    if (!selected) {
      changeYear(year);
    }
  }

  render() {
    const { selected, year } = this.props;
    return (
      <YearButton
        selected={selected}
        onClick={this.setYear}
      >
        {year}
      </YearButton>
    );
  }
}

export default Button;
