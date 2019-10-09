// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import Chip from './Chip';
import styles from './Chips.module.scss';
import type { Chip as ChipType } from './types';

type Props = {
  className?: string,
  chips: Array<ChipType>,
  onCreateChip: (value: string) => void,
  onDeletedChips: (string, list?: Array<ChipType>) => void
};

type State = {
  value: string
}

export default class Chips extends Component<Props, State> {
  static defaultProps = {
    className: '',
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onCreateChip = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = this.state;
    const { onCreateChip } = this.props;
    this.setState({ value: '' });
    onCreateChip(value);
  }

  onChangeInput = (value: string) => {
    this.setState({ value });
  }

  onDeletedChips = (id: string) => {
    const { onDeletedChips, chips } = this.props;
    onDeletedChips(id, chips.filter((item) => item.id !== id));
  }

  render() {
    const { value } = this.state;
    const { className, chips } = this.props;
    return (
      <form onSubmit={this.onCreateChip}>
        <div {...this.props} className={classNames(styles['chip-container'], className)}>
          <div className={styles['chips-list']}>
            {
              !chips && [{ id: '1', title: 'sdsd' }].map((item) => (
                <Chip key={item.id} onDeletedChips={this.onDeletedChips} {...item} />
              ))
            }
            <input
              onChange={(e) => this.onChangeInput(e.target.value)}
              value={value}
              className={styles['chip-input']}
            />
          </div>
        </div>
      </form>
    );
  }
}
