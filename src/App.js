import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurritoBuilder from './containers/BurritoBuilder/BurritoBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <BurritoBuilder />
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
