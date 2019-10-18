// @flow
import React, { Component } from 'react';
import { Button } from 'ui-kit/Button';
import type { ButtonSize } from 'ui-kit/Button/Button';
import styles from './Switcher.module.scss';

type SwitcherItem = {
  label: string,
  value: string
}

type Props = {
  items: Array<string | SwitcherItem>,
  value: string,
  size?: ButtonSize,
  onChange: (item: string) => void
}

class Switcher extends Component<Props> {
  static defaultProps = {
    size: 'md',
  }

  getPropsFromItem = (item: string | SwitcherItem): SwitcherItem => (typeof item === 'object' ? item : { label: item, value: item })

  selectItem = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { onChange } = this.props;
    const { value } = e.currentTarget.dataset;
    onChange(value);
  }

  render() {
    const {
      items, value: swValue, size,
    } = this.props;

    return (
      <div className={styles.switcher}>
        {items.map((item) => {
          const { label, value } = this.getPropsFromItem(item);
          return (
            <Button
              key={value}
              use={swValue === value ? 'default' : 'grey-filled'}
              className={styles.button}
              data-value={value}
              onClick={this.selectItem}
              size={size}
            >
              {label}
            </Button>
          );
        })}
      </div>
    );
  }
}

export default Switcher;