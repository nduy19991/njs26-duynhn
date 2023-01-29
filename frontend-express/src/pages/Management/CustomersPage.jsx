import React from "react";
import axios from "axios";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Table,
  Space,
  Modal,
  DatePicker,
  Popconfirm,
} from "antd";

function CustomersPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [Customers, setCustomers] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);

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
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.birthday).format("DD-MM-YYYY")}</span>
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
              onClick={() => selectCustomer(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="OK"
              cancelText="Close"
              onConfirm={() => {
                deleteCustomer(record._id);
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
    axios.get("http://localhost:9000/customers").then((response) => {
      // console.log(response.data);
      setCustomers(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios.post("http://localhost:9000/customers", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
    });
  };

  const deleteCustomer = (_id) => {
    axios.delete("http://localhost:9000/customers/" + _id).then((response) => {
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
    });
  };

  const selectCustomer = (data) => {
    setEditModalVisible(true);
    setSelectedCustomer(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const onEditFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios
      .patch("http://localhost:9000/customers/" + selectedCustomer._id, values)
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
      {/* CREATE FORM */}
      <div style={{ width: "100%" }}>
        <h1
          style={{
            width: "17%",
            margin: "auto",
            fontSize: "35px",
            marginBottom: "50px",
          }}
        >
          Create Customer
        </h1>
      </div>
      <Form
        form={createForm}
        name="create-Customer"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinish}
      >
        {/* FIRST NAME */}
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter fist name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* LAST NAME */}
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter last name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
            {
              type: "email",
              message: "Please enter correct email format",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* PHONENUMBER */}
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please enter phone number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* ADDRESS */}
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* BIRTHDAY */}
        <Form.Item
          label="Birthday"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Please enter birthday",
            },
          ]}
        >
          <DatePicker />
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
      <div style={{ width: "100%" }}>
        <h1
          style={{
            width: "15%",
            margin: "auto",
            fontSize: "35px",
            marginBottom: "50px",
          }}
        >
          Customers List
        </h1>
      </div>
      <Table
        rowKey={"_id"}
        dataSource={Customers}
        columns={columns}
        pagination={false}
        style={{ width: "75%", margin: "auto" }}
      />

      {/* UPDATE FORM */}
      <Modal
        open={editModalVisible}
        title="Edit customer information"
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
          name="update-Customer"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          onFinish={onEditFinish}
        >
          {/* FIRST NAME */}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter first name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* LAST NAME */}
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "VPlease enter last name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* EMAIL */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
              {
                type: "email",
                message: "Please enter correct email format",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PHONENUMBER */}
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* ADDRESS */}
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter address",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* BIRTHDAY */}
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Please enter birthday",
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

export default CustomersPage;
