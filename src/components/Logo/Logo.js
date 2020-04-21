import React from 'react';

import burritoLogo from '../../assets/images/burrito512x512.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burritoLogo} alt="My burrito"/>
  </div>
  );

export default logo;
