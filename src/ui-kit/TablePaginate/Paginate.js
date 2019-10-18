// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './TablePaginate.module.scss';


type Props = {
  count: number,
  togglePage: (number) => void,
  activeNum: number,
  className?: string,
  style?: {
    [string]: number | string
  }
}

type State = {
  active: number
}


class Paginate extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    style: {},
  }

  constructor(props: Props) {
    super(props);

    const { activeNum } = props;
    const active = activeNum || 0;
    this.state = {
      active,
    };
  }

  togglePage = (idx: number) => {
    const { togglePage } = this.props;
    this.setState({
      active: idx,
    });
    togglePage(idx);
  }

  getButtons = () => {
    const { count } = this.props;
    const arr = [];
    for (let i = 0; i < count; i += 1) {
      arr.push(i + 1);
    }

    return arr;
  }

  render() {
    const { active } = this.state;
    const {
      count, className, togglePage, activeNum, style, ...restProps
    } = this.props;
    return (
      <div
        style={style}
        className={classNames(styles.container_paginate, className)}
        {...restProps}
      >
        <div className={styles.buttons_list}>
          {
            active > 1 && (
              <button
                type="button"
                className={styles['prev-button']}
                onClick={() => this.togglePage(active - 1)}
              >
                Prev
              </button>
            )
          }
          {
            this.getButtons().map((item: number, i) => (
              <button
                className={classNames(
                  {
                    [styles.first]: active === i + 1 && i === 0,
                    [styles.last]: i + 1 === active && active === count,
                    [styles.active]: active === i + 1,
                  },
                )}
                type="button"
                key={item}
                onClick={() => this.togglePage(i + 1)}
              >
                { item }
              </button>
            ))
          }
          {
            active < count && (
              <button
                type="button"
                className={styles['next-button']}
                onClick={() => this.togglePage(active + 1)}
              >
                Next
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

export default Paginate;
