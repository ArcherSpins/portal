// @flow

import React from 'react';
import {
  Input,
} from '@sfxdx/ui-kit';
import { Block, Label } from './styled';
import './style.scss';

type Props = {
  startTime: string,
  startEnd: string,
  onChangeStartTime: (string) => void,
  onChangeEndTime: (string) => void
}

export default ({
  startTime,
  startEnd,
  onChangeStartTime,
  onChangeEndTime,
}: Props) => (
  <>
    <Label>Time</Label>
    <Block>
      <Input
        className="sm-input"
        value={startTime}
        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
        onChange={(e) => onChangeStartTime(e.target.value)}
      />
      <span className="span-couple">-</span>
      <Input
        className="sm-input"
        value={startEnd}
        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
        onChange={(e) => onChangeEndTime(e.target.value)}
      />
    </Block>
  </>
);
