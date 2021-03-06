import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';

import Spinner from '..';

const component = <Spinner />;

describe('The Spinner component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(component);
    expect(wrapper.hasClass('spinner')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
