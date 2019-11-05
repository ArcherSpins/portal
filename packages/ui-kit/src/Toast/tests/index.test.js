// TODO: TDD
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';

import Toast from '..';

const component = <Toast />;

describe('The Toast component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(component);
    expect(wrapper.hasClass('toast')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
