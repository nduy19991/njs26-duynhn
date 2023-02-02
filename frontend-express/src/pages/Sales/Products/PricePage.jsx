import React from "react";
import { Button, Form, InputNumber, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import numeral from "numeral";

export default function PricePage() {
  const columns = [
    {
      title: "TT",
      key: "no",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{index + 1}</span>
          </div>
        );
      },
    },

    {
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Nhà cung cấp</div>;
      },
      dataIndex: "supplier",
      key: "supplier",
      width: "20%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>{record.supplier?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{text}</strong>
          </div>
        );
      },
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      width: "15%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0$")}</span>
          </div>
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      width: "10%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <strong>{numeral(text).format("0,0$")}</strong>
          </div>
        );
      },
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      width: "15%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0")}%</span>
          </div>
        );
      },
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      width: "15%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0")}</span>
          </div>
        );
      },
    },
  ];

  const [products, setProducts] = React.useState([]);
  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let { price } = values;
    axios
      .get("http://localhost:9000/products/questions/3?price=" + price, values)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
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
          label="Nhập mức giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mức giá",
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
        style={{ width: "40%", margin: "auto" }}
      />
    </div>
  );
}
