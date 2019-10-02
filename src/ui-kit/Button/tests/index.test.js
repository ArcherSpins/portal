import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';

import { Button, ButtonWithProgress } from '..';
import styles from '../Button.module.scss';

describe('The Button', () => {
  it('default button renders correctly', () => {
    const button = <Button use="default" />;
    const wrapper = shallow(button);
    expect(wrapper.hasClass(styles.default)).toBeTruthy();
    const tree = renderer.create(button).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('transparent button renders correctly', () => {
    const button = <Button use="transparent" />;
    const wrapper = shallow(button);
    expect(wrapper.hasClass(styles.transparent)).toBeTruthy();
    const tree = renderer.create(button).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('grey button renders correctly', () => {
    const button = <Button use="grey" />;
    const wrapper = shallow(button);
    expect(wrapper.hasClass(styles.grey)).toBeTruthy();
    const tree = renderer.create(button).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClick', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Button use="grey" onClick={mockOnClick} />);
    wrapper.find('button').simulate('click');
    expect(mockOnClick.mock.calls.length).toBe(1);
  });

  it('should show/hide child when changing loading prop', () => {
    const button = <ButtonWithProgress loading={false}>Some text</ButtonWithProgress>;
    const wrapper = shallow(button);
    expect(wrapper.find('[data-type="content"]').hasClass(styles.contentVisible)).toBeTruthy();
    wrapper.setProps({ loading: true });
    expect(wrapper.find('[data-type="content"]').hasClass(styles.contentHidden)).toBeTruthy();
  });

  it('should show/hide spinner when changing loading prop', () => {
    const button = <ButtonWithProgress loading={false}>Some text</ButtonWithProgress>;
    const wrapper = shallow(button);
    expect(wrapper.find('[data-type="spinner"]').hasClass(styles.contentHidden)).toBeTruthy();
    wrapper.setProps({ loading: true });
    expect(wrapper.find('[data-type="spinner"]').hasClass(styles.contentVisible)).toBeTruthy();
  });
});
