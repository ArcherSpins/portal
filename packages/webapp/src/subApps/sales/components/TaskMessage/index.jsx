// @flow
import React from 'react';
import { Accent } from '@sfxdx/ui-kit';
import {
  Container,
  HeaderTitle,
  Status,
  Content,
  TaskBlock,
  LineContainer,
  Line,
  LineText,
} from './styled';
import taskIcon from './taskIcon.svg';

type Props = {
  onClick: () => void
}

export default ({ onClick }: Props) => (
  <TaskBlock>
    <LineContainer>
      <Line />
      <LineText>Pay Attention</LineText>
    </LineContainer>
    <Accent color="success" style={{ width: '75%' }}>
      <Container onClick={onClick}>
        <HeaderTitle>
          <div className="main-title">
            <span className="title">
              <img alt="task" src={taskIcon} />
              <span className="task-title">Estimate</span>
            </span>
            <span className="date-info">
              26 March 2019 at 11:00
            </span>
          </div>
          <Status status="success">Open</Status>
        </HeaderTitle>
        <Content>
          So strongly and metaphysically did
          I conceive of my situation then, that while earnestly watching his motions,
          I seemed distinctly to perceive that my own
          individuality was now merged in a joint stock company of two
        </Content>
        <div className="d-flex justify-content-end align-items-center" style={{ color: '#818A95' }}>
          <i className="icon-calendar ml-10" />
          <span style={{ marginLeft: 1 }}>Today, 11:00 - 18:00</span>
        </div>
      </Container>
    </Accent>
  </TaskBlock>
);
