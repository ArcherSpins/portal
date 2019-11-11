// @flow
import React from 'react';
import defaultPreloader from './button-preloader-default.gif';
import greyPreloader from './button-preloader-grey.gif';
import whitePreloader from './button-preloader-white.gif';
import { PreloaderWrap } from './styled';

type Props = {
  loading?: boolean,
  type?: 'transparent' | 'grey' | 'borderless' | 'default' | 'black-transparent',
  small: boolean
}

const getImg = (type) => {
  switch (type) {
    case 'transparent':
    case 'borderless':
    case 'black-transparent':
      return whitePreloader;
    case 'grey':
      return greyPreloader;
    default:
      return defaultPreloader;
  }
};

const Preloader = ({ loading, type, small }: Props) => (
  <PreloaderWrap loading={loading} small={small}>
    <img src={getImg(type)} alt="loading..." />
  </PreloaderWrap>
);

Preloader.defaultProps = {
  loading: false,
  type: 'default',
};

export default Preloader;
