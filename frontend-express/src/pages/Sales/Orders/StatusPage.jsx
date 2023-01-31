import React from "react";
import { Button, Form, Table, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";

export default function StatusPage() {
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
      title: "Tên sản phẩm",
      dataIndex: "productId",
      key: "products",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>{record.product.name}</span>
          </div>
        );
      },
    },
    {
      title: "Ngày tạo đơn",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.createdDate}</span>
          </div>
        );
      },
    },
    {
      title: "Ngày giao hàng",
      dataIndex: "shippedDate",
      key: "shippedDate",
    },
    {
      title: "Tình trạng đơn",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>
              {record.customer.firstName + " " + record.customer.lastName}
            </span>
          </div>
        );
      },
    },
    {
      title: "Nhân viên bán hàng",
      dataIndex: "employee",
      key: "employee",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>
              {record.employee.firstName + " " + record.employee.lastName}
            </span>
          </div>
        );
      },
    },
  ];

  const [orders, setOrders] = React.useState([]);
  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let { status } = values;
    axios
      .get("http://localhost:9000/orders/questions/7?status=" + status, values)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
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
          span: 2,
        }}
        onFinish={onFinish}
      >
        <FormItem
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please select order status ",
            },
          ]}
        >
          <Select
            options={
              [
                {
                  value: 'COMPLETED',
                  label: 'COMPLETED',
                },
                {
                  value: 'WAITING',
                  label: 'WAITING',
                },
                {
                  value: 'CANCELED',
                  label: 'CANCELED',
                },
              ]
            }
          />
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
        rowKey={"_id"}
        dataSource={orders}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
