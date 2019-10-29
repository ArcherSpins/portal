// @flow
import React, { Component } from 'react';
import noop from 'lodash.noop';
import Input, { type InputProps } from 'ui-kit/Input';
import classNames from 'classnames';
import styles from './IconInput.module.scss';

type Props = {
  onIconClick?: () => void,
} & InputProps

class InputIcon extends Component<Props> {
  static defaultProps = {
    onIconClick: noop,
  };

  render() {
    const {
      onIconClick,
      icon,
      size,
      label,
      name,
      ...restProps
    } = this.props;

    return (
      <div
        className={
          classNames(
            styles['input-icon'],
            { [styles.label_sm]: size && label },
          )
        }
      >
        <div className={classNames(styles.wrap)}>
          <Input
            size={size}
            name={name}
            label={label}
            {...restProps}
          />
          {icon && (
            <button onClick={onIconClick} className={styles.iconButton} type="button">
              {icon}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default InputIcon;
