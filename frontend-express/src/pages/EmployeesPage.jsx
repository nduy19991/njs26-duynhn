import React from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Button, Table, Space, Modal, DatePicker, Popconfirm } from "antd";

function EmployeesPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [Employees, setEmployees] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);

  // COLUMNS OF ANTD TABLE
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
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "5%",
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
      title: "Bỉrthday",
      dataIndex: "birthday",
      key: "birthday",
      
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
              onClick={() => selectEmployee(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="Ok"
              cancelText="Close"
              onConfirm={() => {
                deleteEmployee(record._id);
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
    axios.get("http://localhost:9000/employees").then((response) => {
      // console.log(response.data);
      setEmployees(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios.post("http://localhost:9000/employees", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
    });
  };

  const deleteEmployee = (_id) => {
    axios.delete("http://localhost:9000/employees/" + _id).then((response) => {
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
    });
  };

  const selectEmployee = (data) => {
    setEditModalVisible(true);
    setSelectedEmployee(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const onEditFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios
      .patch("http://localhost:9000/employees/" + selectedEmployee.id, values)
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
      <h1 style={{width:'17%', margin:'auto', fontSize:'35px', marginBottom:'50px'}}>Create Employee</h1>
      </div>
      {/* CREATE FORM */}
      <Form
        form={createForm}
        name="create-Employee"
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
              message: "Please enter employee first name",
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
              message: "Please enter employee last name",
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
              message: "Please enter employee email",
            },
            {
              type: 'email',
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
              message: "Please enter employee phone number",
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
              message: "Please enter employee address",
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
              message: "Please enter employee birthday",
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
            width: "13%",
            margin: "auto",
            fontSize: "35px",
            marginBottom: "50px",
          }}
        >
          Employees List
        </h1>
      </div>
      <Table
        rowKey={"_id"}
        dataSource={Employees}
        columns={columns}
        pagination={false}
      />

      {/* UPDATE FORM */}
      <Modal
        open={editModalVisible}
        title="Edit employee information"
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
          name="update-Employee"
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
              message: "Please enter employee first name",
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
              message: "Please enter employee last name",
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
              message: "Please enter employee email",
            },
            {
              type: 'email',
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
              message: "Please enter employee phone number",
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
              message: "Please enter employee address",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* BIRTHDAY */}
        <Form.Item
          label="Bỉrthday"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Please enter employee birthday",
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

export default EmployeesPage;
