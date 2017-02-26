import Wrapper from 'js/components/modals/Wrapper';
import { shallow } from 'enzyme';
import React from 'react';

describe('Modal Wrapper Tests', () => {

  test('Rendering the Modal Wrapper should not throw', () => {
    shallow(<Wrapper />);
  });

  test('Should contain children passed into it', () => {
    const wrapper = shallow(
      <Wrapper>
        <div className='sample-content' />
      </Wrapper>
    );

    expect(wrapper.contains(<div className='sample-content' />)).toBeTruthy();
  });

  test('Should contain an element with a class matching the theme passed in', () => {
    const wrapper = shallow(<Wrapper theme='sample-theme' />);
    expect(wrapper.find('.sample-theme')).toHaveLength(1);
  });

  test('Should set the display style according to the visible prop', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper.node.props.style.display).toMatch('none');
    wrapper.setProps({ visible: true });
    expect(wrapper.node.props.style.display).toMatch('block');
  });

  test('Should call the close callback when the close icon is clicked', () => {
    const closeCallback = jest.fn();
    const wrapper = shallow(<Wrapper close={closeCallback} />);
    wrapper.find('div[title="close"]').simulate('click');
    expect(closeCallback).toHaveBeenCalled();
  });

  test('Should call the close callback when the background is clicked', () => {
    const closeCallback = jest.fn();
    const wrapper = shallow(<Wrapper close={closeCallback} />);
    wrapper.find('div > div').simulate('click');
    expect(closeCallback).toHaveBeenCalled();
  });

});
