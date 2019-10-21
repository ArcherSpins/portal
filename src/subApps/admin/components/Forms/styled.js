import styled from 'styled-components';


export const Label = styled.span`
  font-family: Proxima Nova;
  font-size: 14px;
  line-height: 20px;
  color: #333;
`;

export const FieldBlock = styled.div`
  margin-bottom: 20px;
`;

export const InputForm = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #C6CCD5;
  border-radius: 4px;

  &:focus {
    box-shadow: none;
  }
`;

export const AuthForm = styled.form`
  padding: 10px;
`;

export const SubmitButton = styled.button`
  background: ;
  background-color: ${(props) => {
    const color = props.bgColor || '#61B16F';
    return color;
  }};
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  border-radius: 4px;
  color: ${(props) => {
    const color = props.color || 'white';
    return color;
  }};
  padding: 4px 35px;
  margin: ${(props) => {
    const margin = props.center ? '20px auto' : '20px 0px 0px 0px';
    return margin;
  }};
  display: block;
`;

export const TitleForm = styled.h1`
  color: #333;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.06);
  font-family: Proxima Nova;
  font-size: 28px;
  line-height: 40px;
  font-weight: bold;
  padding: 15px 0;
  margin-bottom: 15px;
  text-align: center;
`;

export const ContainerForm = styled.div`
  width: 320px;
  margin-top: 75px;
`;

export const LinkToggle = styled.span`
  font-family: Proxima Nova;
  font-size: 14px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration-line: underline;
  color: #79818D;
  cursor: pointer;
`;

// export const SubmitButton = styled.button`
//   background-color: ${props => {
//     const color = props.bgColor || '#219653';
//     return color;
//   }};
//   color: ${props => {
//     const color = props.color || 'white';
//     return color;
//   }};
//   padding: 4px 10px;
//   border-radius: 4px;
// `;
