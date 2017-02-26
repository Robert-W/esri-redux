import Wrapper from 'js/components/modals/Wrapper';
import { shallow } from 'enzyme';
import React from 'react';

test('Rendering the Modal Wrapper should not throw', () => {
  shallow(<Wrapper />);
});
