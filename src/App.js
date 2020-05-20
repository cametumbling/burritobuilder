import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurritoBuilder from './containers/BurritoBuilder/BurritoBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/checkout' component={ Checkout } />
          <Route path='/orders' component={ Orders } />
          <Route path='/auth' component={ Auth } />
          <Route path='/' exact component={ BurritoBuilder } />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
