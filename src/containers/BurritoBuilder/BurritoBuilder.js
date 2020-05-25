import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burrito from '../../components/Burrito/Burrito';
import BuildControls from '../../components/Burrito/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burrito/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurritoBuilder extends Component {
  state = {
    purchasing: false,
  }

componentDidMount () {
   this.props.onInitIngredients();
}

updatePurchaseState(ingredients) {
  const sum = Object.keys(ingredients).map(igKey => {
    return ingredients[igKey]
  }).reduce((sum, el) => {
    return sum + el;
    }, 0);
  return sum > 0;
}

purchaseHandler = () => {
  if (this.props.isAuthenticated) {
    this.setState({purchasing: true})
  } else {
    this.props.onSetAuthRedirectPath('/checkout');
    this.props.history.push('/auth');
  }
}

purchaseCancelHandler = () => {
  this.setState({purchasing: false})
}

purchaseContinueHandler = () => {
  this.props.onInitPurchase();
  this.props.history.push('/checkout');
}

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burrito = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (this.props.ings) {
      burrito = (
        <Aux>
          <Burrito ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            price={this.props.price} />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
         />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burrito}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burritoBuilder.ingredients,
    price: state.burritoBuilder.totalPrice,
    error: state.burritoBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurritoBuilder, axios));
