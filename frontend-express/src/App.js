import React from 'react'
import numeral from'numeral'
import 'numeral/locales/en-au'
import "./App.css"
// import ProductsPage from './pages/ProductsPage';
// import CustomersPage from './pages/CustomersPage';
// import EmployeesPage from './pages/EmployeesPage';
// import SuppliersPage from './pages/SuppliersPage';
// import CategoriesPage from './pages/CategoriesPage';
import OdersPage from './pages/OrdersPage';

// numeral.locale('vi')
numeral.locale('en-au')

function App() {
  return (<div className="App">
    {/* <ProductsPage/> */}
    {/* <CustomersPage/> */}
    {/* <EmployeesPage/> */}
    {/* <SuppliersPage/> */}
    {/* <CategoriesPage/> */}
    <OdersPage/>
  </div>
  );
}

export default App;
