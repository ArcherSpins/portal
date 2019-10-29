// @flow
import React, { type Node, Component } from 'react';
import MaskedInput from 'react-text-mask';
import noop from 'lodash.noop';
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

type State = {
  focused: boolean
}
class Input extends Component<Props, State> {
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

  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  handleFocus = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;
    this.setState({
      focused: true,
    });

    if (onFocus) {
      onFocus(event);
    }
  };

  handleBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;
    this.setState({
      focused: false,
    });

    if (onBlur) {
      onBlur(event);
    }
  };

  render() {
    const {
      type,
      placeholder,
      onChange,
      error,
      disabled,
      value,
      className = '',
      name,
      use = 'default',
      label,
      onBlur,
      onIconClick,
      icon,
      mask,
      size,
      ...restProps
    } = this.props;

    const { focused } = this.state;

    return (
      <div
        className={
          classNames(
            'input-icon',
            styles[use],
            styles[size],
            {
              [styles.error]: error,
              [styles.focus]: focused,
              [styles.disabled]: disabled,
            },
            className,
          )
        }
      >
        <label htmlFor={name}>
          {label}
        </label>
        <div className={classNames(styles.wrap)}>
          {
            mask ? (
              <MaskedInput
                mask={mask}
                placeholder={placeholder}
                onChange={onChange}
                id={name}
                render={(ref, props) => (
                  <input
                    ref={ref}
                    {...restProps}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    disabled={disabled}
                    value={value}
                    {...props}
                  />
                )}
              />
            ) : (
              <input
                {...restProps}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                disabled={disabled}
                value={value}
              />
            )
          }
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

export default Input;
