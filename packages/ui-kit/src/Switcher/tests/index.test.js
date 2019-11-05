// TODO: TDD
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';

import Switcher from '..';

const component = <Switcher />;

describe('The Switcher component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(component);
    expect(wrapper.hasClass('switcher')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
