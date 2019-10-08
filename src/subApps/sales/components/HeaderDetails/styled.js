
import styled from 'styled-components';
import { Heading } from '../shared/styled';

const InputForTitle = styled.input`
    padding: 5px 3px;
    display: block;
    min-width: 400px;
    max-height: 40px;
    font-weight: bold;
    font-family: Proxima Nova;
    font-size: 2em;
    outline: none;
    width: auto;

    background: #FFFFFF;
    border: 1px solid #C6CCD5;
    box-sizing: border-box;
    border-radius: 4px;
    color: #333333;
`;

const ButtonForTitle = styled.button`
  padding: 10px;
`;

const Title = styled(Heading)`
  margin-right: 20px;
  font-size: 14px;
  word-wrap: break-word;
  max-width: 96%;
`;

export {
  InputForTitle,
  ButtonForTitle,
  Title,
};
