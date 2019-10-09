// @flow
import React from 'react';
// $FlowFixMe
import Select, { Async } from 'react-select';
import { SelectContainer } from './styled';

type SelectProps = {
  options: Array<{value: string, label: string, id?: string | number}>,
  onChange: ({ value: string, label: string, id?: string | number }) => void,
  selected?: { value: string, label: string, id?: string | number } | null,
  className?: string,
  selectedName?: string,
  isSearch?: boolean,
  async: boolean,
  error: boolean
}

export default class SelectComponent extends React.Component<SelectProps, {
  selectedOption: null | { value: string, label: string, id?: string | number }
}> {
  constructor() {
    super();

    this.state = {
      selectedOption: null,
    };
  }

  componentDidMount(): void {
    const { selected, options } = this.props;
    const select = options.length > 0 ? options[0] : null;
    this.setState({ selectedOption: selected || select });
  }

  handleChange = (selectedOption: { label: string, value: string, id?: string | number }): void => {
    const { onChange, selectedName } = this.props;
    this.setState({ selectedOption });
    onChange({
      ...selectedOption,
      selectedName,
    });
  };

  render() {
    const { selectedOption } = this.state;
    const {
      options, className, isSearch, async, error,
    } = this.props;
    return (
      <SelectContainer
        error={error}
        className={className}
      >
        {
          async ? (
            <Async
              {...this.props}
              isSearchable={isSearch}
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          ) : (
            <Select
              isSearchable={isSearch}
              value={selectedOption}
              defaultValue={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          )
        }
      </SelectContainer>
    );
  }
}

// $FlowFixMe
SelectComponent.defaultProps = {
  selected: null,
  className: '',
  selectedName: null,
  isSearch: false,
};
