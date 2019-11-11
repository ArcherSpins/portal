// @flow
import React, { Component } from 'react';
import noop from 'lodash.noop';
import classNames from 'classnames';
import Input, { type InputProps } from '../Input';
import styles from './IconInput.module.scss';

type Props = {
  onIconClick?: () => void,
  classNameButton?: string
} & InputProps

class InputIcon extends Component<Props> {
  static defaultProps = {
    onIconClick: noop,
    classNameButton: '',
  };

  render() {
    const {
      onIconClick,
      icon,
      size,
      label,
      name,
      classNameButton,
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
            <button onClick={onIconClick} className={classNames(styles.iconButton, classNameButton)} type="button">
              {icon}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default InputIcon;
