// @flow

import React from 'react';
import {
  Input,
} from '@sfxdx/ui-kit';
import { Block, Label } from './styled';
import './style.scss';

export default () => (
  <>
    <Label>Time</Label>
    <Block>
      <Input className="sm-input" value="11:00" />
      <span className="span-couple">-</span>
      <Input className="sm-input" value="11:00" />
    </Block>
  </>
);
