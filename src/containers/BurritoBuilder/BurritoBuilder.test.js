import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurritoBuilder } from './BurritoBuilder';
import BuildControls from '../../components/Burrito/BuildControls/BuildControls';

configure({ adapter: new Adapter()});

describe('<BurritoBuilder/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurritoBuilder onInitIngredients={()=>{}} />);
  });

  it('should render <BuildControls/> when receiving ingredients', () => {
    wrapper.setProps({ings: {salad: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});

