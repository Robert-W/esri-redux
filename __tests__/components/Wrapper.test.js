import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import Wrapper from 'js/components/modals/Wrapper';
import { shallow } from 'enzyme';
import React from 'react';

/**
* Enzyme is great for dom testing
*/
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
    let element = wrapper.getElement();
    expect(element.props.style.display).toMatch('none');
    // Make it visible
    wrapper.setProps({ visible: true });
    element = wrapper.getElement();
    expect(element.props.style.display).toMatch('block');
    // Hide it again
    wrapper.setProps({ visible: false });
    element = wrapper.getElement();
    expect(element.props.style.display).toMatch('none');
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
