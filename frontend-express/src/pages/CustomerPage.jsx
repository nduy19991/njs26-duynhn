import React from "react";
import axios from "axios";
import { Form, Input, Button, Table, Space, Modal } from "antd";
import numeral from "numeral";

function CustomersPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [Customers, setCustomers] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);

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
      width: "1%",
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
            <Button onClick={() => selectCustomer(record)}>Sửa</Button>
            <Button onClick={() => deleteCustomer(record.id)}>Xoá</Button>
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

  const deleteCustomer = (id) => {
    axios.delete("http://localhost:9000/customers/" + id).then((response) => {
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
      .patch("http://localhost:9000/customers/" + selectedCustomer.id, values)
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
          label="Họ"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập họ khách hàng",
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
              message: "Vui lònng nhập tên khách hàng",
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
              message: "Vui lònng nhập số điện thoại khách hàng",
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
              message: "Vui lònng nhập địa chỉ khách hàng",
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
              message: "Vui lònng nhập ngày sinh khách hàng",
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
            Lưu thông tin
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE */}
      <Table
        rowKey={"id"}
        dataSource={Customers}
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
          label="Họ"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập họ khách hàng",
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
              message: "Vui lònng nhập tên khách hàng",
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
              message: "Vui lònng nhập số điện thoại khách hàng",
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
              message: "Vui lònng nhập địa chỉ khách hàng",
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
              message: "Vui lònng nhập ngày sinh khách hàng",
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
