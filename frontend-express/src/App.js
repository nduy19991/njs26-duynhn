import React from 'react'
import numeral from'numeral'
import 'numeral/locales/en-au'
import "./App.css"
import ProductsPage from './pages/ProductsPage';
import CustomerPage from './pages/CustomerPage';

// numeral.locale('vi')
numeral.locale('en-au')

function App() {
  return (<div className="App">
    <ProductsPage/>
    {/* <CustomerPage/> */}
  </div>
  );
}

export default App;
