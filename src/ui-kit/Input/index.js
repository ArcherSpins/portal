// @flow
import React, { type Node, Component } from 'react';
import MaskedInput from 'react-text-mask';
import noop from 'lodash.noop';
import classNames from 'classnames';
import xmark from './xmark.svg';
import styles from './Input.module.scss';

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
  clearable?: boolean,
  prefix?: string,
  onClearClick?: () => void,
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
    clearable: false,
    onClearClick: noop,
    icon: null,
    prefix: '',
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
      clearable,
      prefix,
      onClearClick,
      icon,
      mask,
      size,
      ...restProps
    } = this.props;

    const { focused } = this.state;

    if (icon && prefix) throw new Error('icon and prefix props cannot be used at the same time');

    return (
      <div
        className={
          classNames(
            styles[use],
            styles[size],
            {
              [styles.error]: error,
              [styles.paddingLeft]: icon,
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
          {icon && <span className={styles.icon}>{icon}</span>}
          {prefix && <span className={styles.prefix}>{prefix}</span>}
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
          {/* TODO: REPLACE SVG TO <i /> */}
          {clearable && (value && value.length) && <button onClick={onClearClick} className={styles.clear} type="button"><img src={xmark} alt="clear" /></button>}
        </div>
      </div>
    );
  }
}

export default Input;
