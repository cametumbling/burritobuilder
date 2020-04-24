import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurritoBuilder from './containers/BurritoBuilder/BurritoBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/checkout' component={ Checkout } />
          <Route path='/' exact component={ BurritoBuilder } />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
