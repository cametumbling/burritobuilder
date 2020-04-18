import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burrito from '../../components/Burrito/Burrito';
import BuildControls from '../../components/Burrito/BuildControls/BuildControls';

class BurritoBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    }
  }

  render() {
    return (
      <Aux>
        <Burrito ingredients={this.state.ingredients}/>
        <BuildControls />
      </Aux>
    );
  }
}

export default BurritoBuilder;
