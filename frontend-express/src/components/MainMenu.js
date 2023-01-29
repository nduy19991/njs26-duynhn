import { DatabaseOutlined, HomeOutlined, SettingOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
  { label: 'Home', key: 'home', icon: <HomeOutlined /> }, // remember to pass the key prop
  { label: 'Settings', key: 'settings', icon: <SettingOutlined /> }, // which is required
  {
    label: 'Data management',
    key: 'management',
    icon: <DatabaseOutlined />,
    children: [
      { label: 'Customers', key: 'management/customers' },
      { label: 'Products', key: 'management/products' },
      { label: 'Orders', key: 'management/orders' },
      { label: 'Employees', key: 'management/employees' },
      { label: 'Suppliers', key: 'management/suppliers' },
      { label: 'Categories', key: 'management/categories' },
    ],
  },
  {
    label: 'Sales management',
    key: 'sales',
    icon: <OrderedListOutlined />,
    children: [
      {
        label: 'Products',
        key: 'sales/products/menu',
        children: [
          {
            label: 'Kiểm tra hàng giảm giá',
            key: 'sales/products/discount',
          },
          {
            label: 'Kiểm tra hàng tồn kho',
            key: 'sales/products/stock',
          },
          {
            label: 'Kiểm tra giá sản phẩm',
            key: 'sales/products/price',
          },
        ],
      },
      {
        label: 'Orders',
        key: 'sales/orders/menu',
        children: [
          {
            label: 'Đơn hàng',
            key: 'sales/orders',
          },
          {
            label: 'Thông kê theo trạng thái',
            key: 'sales/orders/status',
          },
          {
            label: 'Thông kê theo thanh toán',
            key: 'sales/orders/payment-status ',
          },
        ],
      },
    ],
  },
];

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div>
      <Menu
        theme='dark'
        items={items}
        onClick={({ key }) => {
          navigate('/' + key);
          console.log(key);
        }}
      />
    </div>
  );
}
