// @flow
import React from 'react';
import { format } from 'date-fns';
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
import { DealTask } from '../../types';
import taskIcon from './taskIcon.svg';

type Props = {
  onClick: (DealTask) => void,
  data: DealTask,
  lineRect: boolean
}

const getDate = (data) => {
  try {
    const date = format(data, "dd MMM yyyy 'at' hh:mm");
    return date;
  } catch (error) {
    return false;
  }
};

export default ({ onClick, data, lineRect }: Props) => (
  <TaskBlock>
    {
      lineRect && (
        <LineContainer>
          <Line />
          <LineText>Pay Attention</LineText>
        </LineContainer>
      )
    }
    <Accent style={{ width: '75%' }}>
      <Container onClick={() => onClick(data)}>
        <HeaderTitle>
          <div className="main-title">
            <span className="title">
              <img alt="task" src={taskIcon} />
              <span className="task-title">Estimate</span>
            </p>
            <span>
              {getDate(new Date(data.createdAt))}
            </span>
          </div>
          <Status status="success">Open</Status>
        </HeaderTitle>
        <Content>
          {data.description}
        </Content>
        <div className="d-flex justify-content-end align-items-center" style={{ color: '#818A95' }}>
          <i className="icon-calendar ml-10" />
          <span style={{ marginLeft: 1 }}>{getDate(new Date(data.endDate))}</span>
        </div>
      </Container>
    </Accent>
  </TaskBlock>
);
