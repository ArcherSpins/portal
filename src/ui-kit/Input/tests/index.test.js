// TODO: TDD
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';

import styles from '../Input.module.scss';
import Input from '..';


describe('The Input component', () => {
  const onChange = jest.fn();
  it('default input renders correctly', () => {
    const component = <Input />;
    const wrapper = shallow(component);
    expect(wrapper.hasClass(styles.default)).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('borderless input renders correctly', () => {
    const component = <Input use="borderless" />;
    const wrapper = shallow(component);
    expect(wrapper.hasClass(styles.borderless)).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should place value in input', () => {
    const component = <Input use="borderless" value="test" />;
    const wrapper = shallow(component);
    expect(wrapper.find('input').props().value).toEqual('test');
  });

  it('should call onChange', () => {
    const component = <Input onChange={onChange} />;
    const wrapper = shallow(component);
    const event = {
      target: {
        value: 'test',
      },
    };
    wrapper.find('input').simulate('change', event);
    expect(onChange).toHaveBeenCalledWith(event);
  });
});
