import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  align-items: center;
  box-shadow: ${(props) => {
    const result = props.noBorder ? 'none' : 'inset 0px -1px 0px #D5D5D5';
    return result;
  }};
  margin-bottom: 20px;
`;

export const LeftBlock = styled.div`
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #757575;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  a {
    color: #333;
    text-decoration: none;
    font-weight: bold;
  }
`;

export const ArrorIcon = styled.img`
`;

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
`;