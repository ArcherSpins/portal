import styled from 'styled-components';

export const TaskBlock = styled.div`
  padding: 20px;
`;

export const Container = styled.button`
  cursor: pointer;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  background-color: transparent;
  /* background-color: ${({ status }) => {
    if (status === 'error') return '#FFF5F5';
    if (status === 'success') return '#ECFDEF';

    return '#F5F7FB';
  }}; */
`;

export const Status = styled.p`
  color: ${({ status }) => {
    if (status === 'success') return '#61B16F';
    if (status === 'error') return '#EB5757';

    return '#818A95';
  }};
`;

export const Content = styled.p`
  text-align: left;
  color: #333333;
  margin-bottom: 5px;
  line-height: 20px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  color: #818A95;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 5px;

  .main-title {
    font-size: 12px;
    font-weight: normal;
    color: #818A95;
    display: flex;
    align-items: center;

    span {
      margin-left: 7px;
    }

    .task-title {
      margin-left: 4px;
      font-weight: bold;
      font-size: 14px;
      color: #333333;
    }

    .p {
      display: flex;
      align-items: center;
    }
  }
`;


export const LineContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Line = styled.div`
  flex-grow: 1;
  background-color: #2F80ED;
  height: 1px;
  margin-right: 5px;
`;

export const LineText = styled.p`
  color: #2F80ED;
  font-size: font-size: 12px;;
`;
