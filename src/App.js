import React, {Component} from 'react';

import Layout from './components/Layout/Layout';
import BurritoBuilder from './containers/BurritoBuilder/BurritoBuilder';

function App() {
  return (
    <div>
      <Layout>
        <BurritoBuilder />
      </Layout>
    </div>
  );
}

export default App;
