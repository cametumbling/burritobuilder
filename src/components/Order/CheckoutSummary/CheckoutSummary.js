import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burrito from '../../Burrito/Burrito';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes great!!!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burrito ingredients={ props.ingredients }/>
      </div>
        <Button
          btnType="Danger"
          clicked={props.checkoutCancelled}>
            CANCEL
        </Button>
        <Button
          btnType="Success"
          clicked={props.checkoutContinued}>
            CONTINUE
        </Button>
    </div>
  )
}

export default checkoutSummary;
