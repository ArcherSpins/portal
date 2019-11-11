import React from 'react';
import { Title } from '../../pages/CRM/styled';

import DealsForm from './deals-form';
import Parametr from './Parametr';

export default () => (
  <div className="component-deals-parametrs">
    <Title>Deal Parameters</Title>
    <DealsForm />
    <ul>
      <Parametr />
    </ul>
  </div>
);
