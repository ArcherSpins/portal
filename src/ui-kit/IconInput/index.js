// @flow
import React, { type Node, Component } from 'react';
import noop from 'lodash.noop';
import Input from 'ui-kit/Input';
import classNames from 'classnames';
import styles from './IconInput.module.scss';

type ValueType = 'password' | 'text';

type InputType = 'default' | 'borderless';
type InputSize = 'sm' | 'md';

type Props = {
  /** Тип текстового значения инпута. @example: input[type="text"] */
  type?: ValueType,
  placeholder?: string,
  error?: boolean,
  /** Тип инпута */
  use?: InputType,
  disabled?: boolean,
  className?: string,
  value?: string,
  label?: string,
  name: string,
  icon?: Node,
  onIconClick?: () => void,
  /** onChange */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Срабатывает при потере фокуса */
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  mask?: Array<mixed>,
  size?: InputSize
}

class InputIcon extends Component<Props> {
  static defaultProps = {
    type: 'text',
    placeholder: '',
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    error: false,
    disabled: false,
    use: 'default',
    value: '',
    className: '',
    label: '',
    onIconClick: noop,
    icon: null,
    mask: null,
    size: 'md',
  };

  render() {
    const {
      onChange,
      className = '',
      onIconClick,
      icon,
      size,
      name,
      label,
      ...restProps
    } = this.props;

    return (
      <div
        className={
          classNames(
            styles['input-icon'],
            { [styles.label_sm]: size && label },
            className,
          )
        }
      >
        <div className={classNames(styles.wrap)}>
          <Input
            name={name}
            onChange={onChange}
            size={size}
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
