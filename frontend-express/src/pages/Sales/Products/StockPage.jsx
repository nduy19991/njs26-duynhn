import React from "react";
import { Button, Form, InputNumber, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import numeral from 'numeral';

export default function StockPage() {

  const columns = [
    {
      title: 'TT',
      key: 'no',
      width: '1%',
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: 'right' }}>
            <span>{index + 1}</span>
          </div>
        );
      },
    },

    {
      title: () => {
        return <div style={{ whiteSpace: 'nowrap' }}>Danh mục</div>;
      },
      dataIndex: 'category',
      key: 'category',
      width: '20%',
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <span>{record.category?.name}</span>
          </div>
        );
      },
    },

    {
      title: () => {
        return <div style={{ whiteSpace: 'nowrap' }}>Nhà cung cấp</div>;
      },
      dataIndex: 'supplier',
      key: 'supplier',
      width: '20%',
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <span>{record.supplier?.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Tên sản phẩm',
      key: 'name',
      dataIndex: 'name',
      render: (text, record, index) => {
        return (
          <div>
            <strong>{text}</strong>
          </div>
        );
      },
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: 'right' }}>
            <span>{numeral(text).format('0,0$')}</span>
          </div>
        );
      },
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: 'right' }}>
            <span>{numeral(text).format('0,0')}%</span>
          </div>
        );
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: 'right' }}>
            <strong>{numeral(text).format('0,0$')}</strong>
          </div>
        );
      },
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: 'right' }}>
            <span>{numeral(text).format('0,0')}</span>
          </div>
        );
      },
    },
  ];

  const [products, setProducts] = React.useState([]);
  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let {stock} = values
    axios.get('http://localhost:9000/products/questions/2?stock=' + stock, values).then((response) =>{
        console.log(response.data)
        setProducts(response.data)
    });
  };

  return (
    <div>
      <Form
        form={searchForm}
        name="search"
        labelCol={{
          span: 11,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinish}
      >
        <FormItem
          label="Nhập số lượng"
          name="stock"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng muốn kiểm tra",
            },
          ]}
        >
          <InputNumber min={0} />
        </FormItem>
        <FormItem
          wrapperCol={{
            offset: 11,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </FormItem>
      </Form>
      <Table
        rowKey="_id"
        dataSource={products}
        columns={columns}
        pagination={false}
        style={{width:'60%', margin:"auto"}}
      />
    </div>
  );
}
