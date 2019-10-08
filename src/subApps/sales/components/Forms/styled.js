import styled, { css } from 'styled-components';

export const Form = styled.form`
  grid-area: content;
  margin-left: 0.7rem;
`;

export const Group = styled.div`
  margin-bottom: 2rem;
  ${({ el }) => el === 2 && css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.5rem;
  `}
`;

export const EmailLabel = styled.span`
  display: inline-flex;
  align-items: center;
  color: #333;
  margin-left: 0.5rem;
`;

export const Upload = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const Skills = styled.div``;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 25%;
  margin-bottom: 1rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid #ECEEF2;
`;

export const FormGroup = styled.div`
`;


export const GroupTitle = styled.p`
  font-size: 1rem;
  margin-bottom: 0.4rem;
  font-weight: bold;
  color: #333;
`;

export const Positions = styled.div`
  background: #F5F7FB;
  padding: 1rem;
  border-radius: 0.25rem;
`;

export const PositionInput = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 5fr 1fr;
  grid-column-gap: 0.5rem;
  grid-template-rows: min-content;
  > * {
    align-self: center;
  }
`;

export const Label = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: bold;
`;

export const PositionList = styled.div``;

export const Plugins = styled(Positions)`
  background: transparent;
  border: 1px solid #E3E6ED;
`;

export const ResourceForm = styled.form`
  display: grid;
  grid-template-columns: 4fr 4fr 1fr;
  grid-column-gap: 1rem;
  margin-top: 1rem;
`;

export const AddPlugin = styled.form`
  display: flex;
  justify-content: space-between;
`;

// Ahmed

export const FieldBlock = styled.div`
  padding: 10px;
`;

export const InputForm = styled.input`
  width: 100%;
  padding: 4px;
  border: 1px solid gray;
  border-radius: 4px;
`;

export const AuthForm = styled.form`
  padding: 10px;
`;
