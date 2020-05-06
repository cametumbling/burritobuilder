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

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
       .then(res => {
         const fetchedOrders = [];
         for(let key in res.data) {
           fetchedOrders.push({
             ...res.data[key],
             id: key
           });
         }
         dispatch(fetchOrdersSuccess(fetchedOrders));
        })
       .catch(err => {
         dispatch(fetchOrdersFail(err));
       });
  }
};
