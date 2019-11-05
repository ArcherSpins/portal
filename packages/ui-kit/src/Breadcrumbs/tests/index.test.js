// TODO: TDD
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';

import Breadcrumbs from '..';

const component = <Breadcrumbs />;

describe('The Breadcrumbs component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(component);
    expect(wrapper.hasClass('breadcrumbs')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
