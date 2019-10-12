/* eslint-disable react/require-default-props */
// @flow
import React from 'react';

import './custom-textarea.styles.scss';

type Props = {
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  value?: string,
  name?: string,
  header?: string
};

const CustomTextarea = ({ header, ...rest }: Props) => (
  <div className="custom-textarea-wrapper">
    {header ? (
      <h3 className="heading-tertiarry">{header}</h3>
    ) : null}
    <textarea {...rest} className="custom-textarea" />
  </div>
);

export default CustomTextarea;
