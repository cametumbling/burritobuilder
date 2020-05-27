import * as actionTypes from './actionTypes';

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

export const purchaseBurrito = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURRITO,
    orderData: orderData,
    token: token,
  }
    // dispatch(purchaseBurritoStart());
    // axios.post('/orders.json?auth=' + token, orderData)
    //   .then(response => {
    //     dispatch(purchaseBurritoSuccess(response.data.name, orderData))
    //   })
    //   .catch(error => {
    //     dispatch(purchaseBurritoFail(error))
    //   });
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

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId,
  }
  // return dispatch => {
  //   dispatch(fetchOrdersStart());
  //   const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
  //   axios.get('/orders.json' + queryParams)
  //      .then(res => {
  //        const fetchedOrders = [];
  //        for(let key in res.data) {
  //          fetchedOrders.push({
  //            ...res.data[key],
  //            id: key
  //          });
  //        }
  //        dispatch(fetchOrdersSuccess(fetchedOrders));
  //       })
  //      .catch(err => {
  //        dispatch(fetchOrdersFail(err));
  //      });
  // }
};
