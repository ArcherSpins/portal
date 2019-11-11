// @flow

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';
import Checkbox from '..';

const defaultProps = {
  id: 'checkbox',
  checked: false,
  onChange: () => {},
};

describe('The Checkbox component', () => {
  it('renders correctly', () => {
    const component = (
      <Checkbox
        {...defaultProps}
      />
    );
    const wrapper = shallow(component);
    expect(wrapper.hasClass('checkbox')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have default props', () => {
    const wrapper = shallow(<Checkbox {...defaultProps} />);
    expect(wrapper.find('label b').length).toEqual(0);
  });

  it('should have label', () => {
    const label = 'Inactive tasks';
    const wrapper = shallow(
      <Checkbox
        {...defaultProps}
        label={label}
      />,
    );
    expect(wrapper.find('label b').prop('children')).toEqual(label);
  });

  it('should change state', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Checkbox
        {...defaultProps}
        onChange={onChange}
      />,
    );
    const input = wrapper.find('label input').first();
    expect(input.prop('onChange')).toEqual(onChange);
    input.simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalled();
  });
});
