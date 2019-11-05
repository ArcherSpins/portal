// TODO: TDD
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';

import Participants from '..';

const component = <Participants />;

describe('The Participants component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(component);
    expect(wrapper.hasClass('participants')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
