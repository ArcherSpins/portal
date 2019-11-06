import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarWrap = styled.div`
  grid-area: sidebar;
  padding-left: ${(props) => props.theme.containerOffset.x};
  padding-top: ${(props) => props.theme.containerOffset.y};
  background: ${(props) => props.theme.colors.green};
  color: white;
  display: grid;
  grid-template-areas: "header" "nav" "alert";
  grid-template-rows: min-content 5fr min-content;
`;

export const SidebarHead = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  grid-area: header
`;

export const SidebarNav = styled.nav`
  margin-top: 1rem;
  grid-area: nav
`;

export const SidebarNavItem = styled(NavLink)`
  color: white;
  display: block;
  text-decoration: none;
  padding: 0.7rem 0 0.7rem ${(props) => props.theme.containerOffset.x};
  margin-right: ${(props) => props.theme.containerOffset.x}
  margin-left: -${(props) => props.theme.containerOffset.x}
  border-radius: 0 0.3rem 0.3rem 0;
  font-size: 1rem;
  font-weight: bold;
  transition: all .25s ease-out;
  position: relative;
  background: ${(props) => (props.active ? props.theme.colors.sidebarLinkHover : 'inherit')}
  &:hover {
    background: ${(props) => props.theme.colors.sidebarLinkHover}
  }

  &:active {
    background: #509A5D;
  }
`;

export const SidebarNavInnerItem = styled(SidebarNavItem)`
  padding-left: 2.5rem;
  position: relative;
  z-index: 2;
  &:hover {
    background: inherit;
  }
`;
