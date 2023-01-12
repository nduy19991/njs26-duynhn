import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import numeral from "numeral";
import "numeral/locales/en-au";
import "./App.css";

import ProductsPage from "./pages/Management/ProductsPage";
import CustomersPage from "./pages/Management/CustomersPage";
import EmployeesPage from './pages/EmployeesPage';
import SuppliersPage from './pages/SuppliersPage';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MainMenu from "./components/MainMenu";
import DiscountPage from "./pages/Sales/Products/DiscountPage";
import StockPage from "./pages/Sales/Products/StockPage";
import StatusPage from "./pages/Sales/Orders/StatusPage";
import PricePage from "./pages/Sales/Products/PricePage";

// numeral.locale('vi')
numeral.locale("en-au");

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <div style={{}}>
      <BrowserRouter>
        <Layout>
          <Sider theme="dark" style={{ minHeight: "100vh" }}>
            <MainMenu/>
          </Sider>
          <Layout>
            <Header>
              <h1 style={{ color: "white", margin: "auto" }}>Nguyễn [H.N] Duy</h1>
            </Header>

            <Content style={{ padding: 24 }}>
              <Routes>
                {/* REGISTER ROUTES */}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                {/* MANAGEMENT */}
                <Route path="/management/products" element={<ProductsPage />} />
                <Route path="/management/customers" element={<CustomersPage />} />
                <Route path="/management/orders" element={<OrdersPage />} />
                <Route path="/management/employees" element={<EmployeesPage />} />
                <Route path="/management/suppliers" element={<SuppliersPage />} />
                <Route path="/management/categories" element={<CategoriesPage />} />
                {/* SALES */}
                <Route path="/sales/orders" element={<OrdersPage />} />
                <Route path="/sales/orders/status" element={<StatusPage />} />
                <Route path="/sales/products/discount" element={<DiscountPage />} />
                <Route path="/sales/products/stock" element={<StockPage />} />
                <Route path="/sales/products/price" element={<PricePage />} />

                {/* No Match Route */}
                <Route path="*" element={<NotFoundPage />}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
