// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import './link-button.styles.scss';

type Props = {
  to: string
};

const LinkButton = (props: Props) => (
  <Link className="link-button" {...props} />
);


export default LinkButton;
