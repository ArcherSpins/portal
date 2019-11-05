// TODO: TDD
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';

import Chips from '..';

const component = <Chips />;

describe('The Chips component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(component);
    expect(wrapper.hasClass('chips')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
