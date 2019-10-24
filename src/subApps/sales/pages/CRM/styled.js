import styled from 'styled-components';
import { Heading, Header as HeaderWrap } from '../../components/shared/styled';

export const Title = styled(Heading)`
  margin-right: 20px;
`;

export const LeftTitleBlock = styled.div`
  form {
    display: flex;
    align-items: center;
  }
`;

export const Header = styled(HeaderWrap)`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 4fr 4fr 1fr;
  padding: 20px 10px;
`;

export const Label = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;


export const Content = styled.div`
  display: flex;
  min-height: 600px;
  flex: 1;
`;
