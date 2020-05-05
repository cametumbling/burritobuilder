import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burrito from '../../components/Burrito/Burrito';
import BuildControls from '../../components/Burrito/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burrito/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burritoBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurritoBuilder extends Component {
  state = {
    //ingredients: null,
    //totalPrice: 4,
    //purchasable: false,
    purchasing: false,
    //loading: false,
    //error: false,
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
  this.setState({purchasing: true})
}

purchaseCancelHandler = () => {
  this.setState({purchasing: false})
}

purchaseContinueHandler = () => {

  // const queryParams = [];
  // for (let i in this.state.ingredients) {
  //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
  // };
  // queryParams.push('price=' + this.state.totalPrice);
  // const queryString = queryParams.join('&');

  // this.props.history.push({
  //   pathname: '/checkout',
  //   search: '?' + queryString,
  // });
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

    //if (this.state.loading) {
    //   orderSummary = <Spinner />;
    //}

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
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burritoBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burritoBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burritoBuilderActions.initIngredients()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurritoBuilder, axios));
