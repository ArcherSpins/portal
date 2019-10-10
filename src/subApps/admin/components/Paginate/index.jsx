// @flow
import React from 'react';
import {
  Button,
  Container,
  NextButton,
  ButtonsList,
  PrevButton,
} from './styled';

type PaginateProps = {
  count: number,
  togglePaginate: (number) => void,
  activeNum: number
}

type PaginateState = {
  active: number
}

class Paginate extends React.Component<PaginateProps, PaginateState> {
  constructor(props: PaginateProps) {
    super(props);

    const { activeNum } = props;
    const active = activeNum || 0;
    this.state = {
      active,
    };
  }

  togglePaginate = (idx: any) => {
    const { togglePaginate } = this.props;
    // $FlowFixMe
    this.setState({
      active: idx,
    });
    togglePaginate(idx);
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
    // $FlowFixMe
    const { active } = this.state;
    // $FlowFixMe
    const { count } = this.props;
    return (
      <Container>
        <ButtonsList>
          {
            active > 0 && (
              <PrevButton
                onClick={() => this.togglePaginate(active - 1)}
              >
                Prev
              </PrevButton>
            )
          }
          {
            this.getButtons().map((item: number, i) => (
              <Button
                first={i === 1 && active === 0}
                last={i === active && active + 1 === count}
                type="button"
                active={active === i}
                key={item}
                onClick={() => this.togglePaginate(item - 1)}
              >
                { item }
              </Button>
            ))
          }
          {
            active + 1 < count && (
              <NextButton
                onClick={() => this.togglePaginate(active + 1)}
              >
                Next
              </NextButton>
            )
          }
        </ButtonsList>
      </Container>
    );
  }
}

// TODO: FIX THIS
// eslint-disable-next-line import/prefer-default-export
export { Paginate };
