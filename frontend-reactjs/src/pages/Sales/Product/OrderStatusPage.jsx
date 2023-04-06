import { Button, Form, Table, Select } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import Styles from "../../../pages/CommonPage.module.css"
import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";

export default function OrderStatusPage() {
  
  const [orders, setOrders] = React.useState([]);

  // Columns of Antd Table
  const columns = [
    {
      title: "STT",
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
      title: "Created Date",
      key: "createdDate",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.createdDate).format("MMMM Do YYYY")}</span>
          </div>
        );
      },
    },
    {
      title: "Shipped Date",
      key: "shippedDate",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.shippedDate).format("MMMM Do YYYY")}</span>
          </div>
        );
      },
    },
    {
      title: "Payment Type",
      key: "paymentType",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.paymentType}</span>
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.status}</span>
          </div>
        );
      },
    },
    {
      title: "Shipping Information",
      dataIndex: "shippingAddress",
      key: "shippingAddress",

      render: (text, record, index) => {
        return (
          <div>
            <span>{record.shippingAddress}</span>
          </div>
        );
      },
    },
  ];


  React.useEffect(() => {
    axios.get("http://localhost:9000/customers").then((response) => {;
    });
  });

  React.useEffect(() => {
    axios.get("http://localhost:9000/employees").then((response) => {
    });
  });

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then((response) => {;
    });
  });

  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let { status } = values;

    // CALL API TO CREATE ORDERS
    axios
      .get("http://localhost:9000/orders/question/7/1?status=" + status, values)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      });
  };

  return (
    <div>
      <div>
        <MultiButtonGroup />
      </div>
      <Form
        className={Styles.form}
        form={searchForm}
        name="search"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        {/* FIRST NAME */}
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please input status!",
            },
          ]}
        >
          <Select
            style={{ width: 120 }}
            options={[
              {
                value: "WAITING",
                label: "WAITING",
              },
              {
                value: "COMPLETED",
                label: "COMPLETED",
              },
              {
                value: "CANCELED",
                label: "CANCELED",
              },
            ]}
          />
        </Form.Item>

        {/* SUBMIT */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE */}
      <Table
        className={Styles.table}
        rowKey="_id"
        dataSource={orders}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
