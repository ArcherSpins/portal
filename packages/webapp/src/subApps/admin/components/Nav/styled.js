import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavWrap = styled.nav`
  display: flex;
  color: white;
  font-size: 1rem;
  justify-content: space-between;
`;

export const MainNav = styled.div`
  display: flex;
  align-items: center;
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
`;
export const Logout = styled.span`
  cursor: pointer;
  transition: all .25s ease;
  font-weight: bold;
  &:hover {
    color: ${(props) => props.theme.colors.lightGrey}
  }
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1.55rem;
  font-weight: 400;
  transition: all .25s ease;
  font-weight: bold;
  &:after {
    display: ${(props) => (props.active ? 'inline-block' : 'none')}
    content: '';
    position: absolute;
    bottom: 0;
    left: 63px;
    width: 0; 
    height: 0; 
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }
  &:hover {
    color: ${(props) => props.theme.lightGrey}
  }
`;

export const Span = styled.span`
  margin-right: 15px;
  font-weight: bold;
`;
