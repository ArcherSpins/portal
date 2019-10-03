// TODO: TDD
import { shallow } from 'enzyme';
import React from 'react';
import App from '.';

const component = <App />;

describe('The App component', () => {
  it('renders without crashing', () => {
    shallow(component);
  });
});
