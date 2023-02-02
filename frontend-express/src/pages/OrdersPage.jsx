import React from "react";
import axios from "axios";
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Button, Table, Space, Modal, DatePicker, Popconfirm, Select } from "antd";

function OdersPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [orders, setOrders] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedOrders, setSelectedOrders] = React.useState(null);

  // COLUMNS OF ANTD TABLE
  const columns = [
    {
      title: "No",
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
      title: "Product's name",
      dataIndex: "productId",
      key: "products",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <span>{record.product.name}</span>
          </div>
        );
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.createdDate).format("DD-MM-YYYY")}</span>
          </div>
        );
      },
    },
    {
      title: "Shipped Date",
      dataIndex: "shippedDate",
      key: "shippedDate",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.shippedDate).format("DD-MM-YYYY")}</span>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Customer's name",
      dataIndex: "customer",
      key: "customer",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <span>{record.customer.firstName + " " + record.customer.lastName}</span>
          </div>
        );
      },
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <span>{record.employee.firstName + " " + record.employee.lastName}</span>
          </div>
        );
      },
    },
    {
      title: "",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectOrders(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="OK"
              cancelText="Close"
              onConfirm={() => {
                deleteOrders(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/orders").then((response) => {
      // console.log(response.data);
      setOrders(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios.post("http://localhost:9000/orders", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
    });
  };

  const deleteOrders = (_id) => {
    axios.delete("http://localhost:9000/orders/" + _id).then((response) => {
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
    });
  };

  const selectOrders = (data) => {
    setEditModalVisible(true);
    setSelectedOrders(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const onEditFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios
      .patch("http://localhost:9000/orders/" + selectedOrders._id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <div>
      <div style={{width:'100%'}}>
      <h1 style={{width:'13%', margin:'auto', fontSize:'35px', marginBottom:'50px'}}>Create Order</h1>
      </div>
      {/* CREATE FORM */}
      <Form
        form={createForm}
        name="create-Oders"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinish}
      >
        {/* TYPE */}
        <Form.Item
          label="Created Date"
          name="createdDate"
          rules={[
            {
              required: true,
              message: "Please select created date",
            },
          ]}
        >
          <DatePicker format="DD-MM-YYYY"/>
        </Form.Item>

        <Form.Item
          label="Shipped Date"
          name="shippedDate"
          rules={[
            {
              required: true,
              message: "Please select shipped date",
            },
          ]}
        >
          
          <DatePicker format="DD-MM-YYYY"/>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 2,
          }}
          rules={[
            {
              required: true,
              message: "Please select status",
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
        </Form.Item>

        <Form.Item
          label="Payment Type"
          name="paymentType"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 2,
          }}
          rules={[
            {
              required: true,
              message: "Please select payment type",
            },
          ]}
        >
          <Select
            options={
              [
                {
                  value: 'CREDIT CARD',
                  label: 'CREDIT CARD',
                },
                {
                  value: 'CASH',
                  label: 'CASH',
                },
                {
                  value: 'MOMO',
                  label: 'MOMO',
                },
              ]
            }
          />
        </Form.Item>

        {/* DESCRIPTION */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter order description",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ giao hàng"
          name="shippingAddress"
          rules={[
            {
              required: true,
              message: "Please enter shipping address",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Customer Id"
          name="customerId"
          rules={[
            {
              required: true,
              message: "Please enter Customer Id",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Employee Id"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Please enter Employee Id",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Id"
          name="productId"
          rules={[
            {
              required: true,
              message: "Please enter Product Id",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        {/* SUBMIT */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE */}
      <div style={{width:'100%'}}>
      <h1 style={{width:'10%', margin:'auto', fontSize:'35px', marginBottom:'50px'}}>Order List</h1>
      </div>
      <Table
        rowKey={"_id"}
        dataSource={orders}
        columns={columns}
        pagination={false}
      />

      {/* UPDATE FORM */}
      <Modal
        open={editModalVisible}
        title="Edit order information"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        onOk={() => {
          updateForm.submit();
        }}
        cancelText="Close"
        okText="Save"
      >
        <Form
          form={updateForm}
          name="update-oders"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          onFinish={onEditFinish}
        >
         <Form.Item
          label="Created Date"
          name="createdDate"
          format="DD-MM-YYYY"
          rules={[
            {
              required: true,
              message: "Please enter created date",
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Shipped Date"
          name="shippedDate"
          rules={[
            {
              required: true,
              message: "Please enter shipped date",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please select order status",
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
        </Form.Item>

        <Form.Item
          label="Payment Type"
          name="paymentType"
          rules={[
            {
              required: true,
              message: "Please select payment type",
            },
          ]}
        >
          
          <Select
            options={
              [
                {
                  value: 'CREDIT CARD',
                  label: 'CREDIT CARD',
                },
                {
                  value: 'CASH',
                  label: 'CASH',
                },
                {
                  value: 'MOMO',
                  label: 'MOMO',
                },
              ]
            }
          />
        </Form.Item>

        {/* DESCRIPTION */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter order description",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Shipping Address"
          name="shippingAddress"
          rules={[
            {
              required: true,
              message: "Please enter shipping address",
            },
          ]}
        >
          
          <Input />
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default OdersPage;
