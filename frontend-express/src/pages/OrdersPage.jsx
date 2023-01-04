import React from "react";
import axios from "axios";
import { Form, Input, Button, Table, Space, Modal } from "antd";

function OdersPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [orders, setOrders] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedOrders, setSelectedOrders] = React.useState(null);

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
      title: "Tên sản phẩm",
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
          <div style={{ whiteSpace: 'nowrap' }}>
            <span>{record.customer.firstName + " " + record.customer.lastName}</span>
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
            <Button onClick={() => selectOrders(record)}>Sửa</Button>
            <Button onClick={() => deleteOrders(record._id)}>Xoá</Button>
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
      <h1 style={{width:'13%', margin:'auto', fontSize:'35px', marginBottom:'50px'}}>Đơn hàng</h1>
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
          label="Ngày tạo đơn"
          name="createdDate"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập ngày tạo đơn",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày giao"
          name="shippedDate"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập ngày giao",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Tình trạng đơn hàng"
          name="status"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập tình trạng đơn hàng",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập mô tả",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hình thức thanh toán"
          name="paymentType"
          rules={[
            {
              required: true,
              message: "Vui lònng chọn hình thức thanh toán",
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
              message: "Vui lònng nhập địa chỉ giao hàng",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã khách hàng"
          name="customerId"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập mã khách hàng",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã nhân viên"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập mã nhân viên",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã sản phẩm"
          name="productId"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập mã sản phẩm",
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
        dataSource={orders}
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
          label="Ngày tạo đơn"
          name="createdDate"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập ngày tạo đơn",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày giao"
          name="shippedDate"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập ngày giao",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Tình trạng đơn hàng"
          name="status"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập tình trạng đơn hàng",
            },
          ]}
        >
          
          <Input />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập mô tả",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hình thức thanh toán"
          name="paymentType"
          rules={[
            {
              required: true,
              message: "Vui lònng chọn hình thức thanh toán",
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
              message: "Vui lònng nhập địa chỉ giao hàng",
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
