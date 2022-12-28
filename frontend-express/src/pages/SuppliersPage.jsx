import React from "react";
import axios from "axios";
import { Form, Input, Button, Table, Space, Modal } from "antd";

function SuppliersPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [suppliers, setSuppliers] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);

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
      title: "Tên nhà sản xuất",
      dataIndex: "name",
      key: "name",
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
      title: "",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button onClick={() => selectSupplier(record)}>Sửa</Button>
            <Button onClick={() => deleteSupplier(record._id)}>Xoá</Button>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/suppliers").then((response) => {
      // console.log(response.data);
      setSuppliers(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios.post("http://localhost:9000/suppliers", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
    });
  };

  const deleteSupplier = (_id) => {
    axios.delete("http://localhost:9000/suppliers/" + _id).then((response) => {
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
    });
  };

  const selectSupplier = (data) => {
    setEditModalVisible(true);
    setSelectedSupplier(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const onEditFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios
      .patch("http://localhost:9000/suppliers/" + selectedSupplier._id, values)
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
        name="create-Supplier"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinish}
      >
        {/* NAME */}
        <Form.Item
          label="Tên nhà sản xuất"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập tên nhà sản xuất",
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
              message: "Vui lònng nhập số điện thoại nhà sản xuất",
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
              message: "Vui lònng nhập địa chỉ nhà sản xuất",
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
        rowKey={"_id"}
        dataSource={suppliers}
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
          name="update-supplier"
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
          label="Tên nhà sản xuất"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập tên nhà sản xuất",
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
              message: "Vui lònng nhập số điện thoại nhà sản xuất",
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
              message: "Vui lònng nhập địa chỉ nhà sản xuất",
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

export default SuppliersPage;
