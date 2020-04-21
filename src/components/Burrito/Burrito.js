import React from 'react';

import classes from './Burrito.module.css';
import BurritoIngredient from './BurritoIngredient/BurritoIngredient';

const burrito = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return[...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurritoIngredient key={igKey + i} type = {igKey} />
    });
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please add ingredients!</p>
    }
  return (
    <div className={classes.Burrito}>
      <BurritoIngredient type="bread-top"/>
      {transformedIngredients}
      <BurritoIngredient type="bread-bottom"/>
    </div>
  );
};

export default burrito;
