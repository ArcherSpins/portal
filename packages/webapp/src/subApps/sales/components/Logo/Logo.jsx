import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.svg';

const Img = styled.img`
  src: url(${(props) => props.src});
  width: 25px;
  height: 16px;
  margin-right: 10px;
  margin-top: 1px;
`;

const Logo = () => (
  <Link to="/">
    <Img src={logo} alt="logo" />
  </Link>
);

export default Logo;
