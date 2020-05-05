import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurritoSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURRITO_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurritoFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURRITO_FAIL,
    error: error,
  };
};

export const purchaseBurritoStart = () => {
  return {
    type: actionTypes.PURCHASE_BURRITO_START
  };
};

export const purchaseBurrito = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurritoStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurritoSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurritoFail(error))
      });
  };
};
