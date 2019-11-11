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
  grid-template-columns: 3fr 3fr 1fr;
  padding: 20px 10px;

  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.06);

  button {
    &:hover {
      color: white;
    }
  }
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
