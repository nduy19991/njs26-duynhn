import React from "react";
import axios from "axios";
import moment from 'moment';
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
      title: "Họ",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Tên",
      dataIndex: "lastName",
      key: "lastName",
      width: "5%",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Thư điện tử",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày sinh",
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
              okText="Đồng ý"
              cancelText="Đóng"
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
      <h1 style={{width:'22%', margin:'auto', fontSize:'35px', marginBottom:'50px'}}>Danh sách nhân viên</h1>
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
          label="Họ"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập họ nhân viên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* LAST NAME */}
        <Form.Item
          label="Tên"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập tên nhân viên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Thư điện tử"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập địa chỉ thư điện tử",
            },
            {
              type: 'email',
              message: "Vui lònng nhập đúng định dạng",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* PHONENUMBER */}
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập số điện thoại nhân viên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* ADDRESS */}
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập địa chỉ nhân viên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* BIRTHDAY */}
        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập ngày sinh nhân viên",
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
            Lưu thông tin
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE */}
      <Table
        rowKey={"_id"}
        dataSource={Employees}
        columns={columns}
        pagination={false}
      />

      {/* UPDATE FORM */}
      <Modal
        open={editModalVisible}
        title="Cập nhật thông tin"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        onOk={() => {
          updateForm.submit();
        }}
        cancelText="Đóng"
        okText="Lưu thông tin"
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
          label="Họ"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập họ nhân viên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* LAST NAME */}
        <Form.Item
          label="Tên"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập tên nhân viên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Thư điện tử"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập địa chỉ thư điện tử",
            },
            {
              type: 'email',
              message: "Vui lònng nhập đúng định dạng",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* PHONENUMBER */}
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập số điện thoại nhân viên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* ADDRESS */}
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập địa chỉ nhân viên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* BIRTHDAY */}
        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập ngày sinh nhân viên",
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
