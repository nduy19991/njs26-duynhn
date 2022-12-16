import React from "react";
import axios from "axios";
import { Form, Input, Button, Table, Space, Modal } from "antd";

function ProductsPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Miễn giảm",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button onClick={() => selectProduct(record)}>Sửa</Button>
            <Button onClick={() => deleteProduct(record.id)}>Xoá</Button>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then((response) => {
      // console.log(response.data);
      setProducts(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios.post("http://localhost:9000/products", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
    });
  };

  const deleteProduct = (id) => {
    axios.delete("http://localhost:9000/products/" + id).then((response) => {
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
    });
  };

  const selectProduct = (data) => {
    setEditModalVisible(true);
    setSelectedProduct(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const onEditFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios
      .patch("http://localhost:9000/products/" + selectedProduct.id, values)
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
        name="create-product"
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
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập tên sản phẩm",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* LAST NAME */}
        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập giá sản phẩm",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* DISCOUNT */}
        <Form.Item
          label="Giảm giá"
          name="discount"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập mức giảm giá",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* STOCK */}
        <Form.Item
          label="Tồn kho"
          name="stock"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập số lượng tồn",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* DESCRIPTION */}
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lònng nhập mô tả sản phẩm",
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
        dataSource={products}
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
          name="update-product"
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
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lònng nhập tên sản phẩm",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* LAST NAME */}
          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lònng nhập giá sản phẩm",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* DISCOUNT */}
          <Form.Item
            label="Giảm giá"
            name="discount"
            rules={[
              {
                required: true,
                message: "Vui lònng nhập mức giảm giá",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* STOCK */}
          <Form.Item
            label="Tồn kho"
            name="stock"
            rules={[
              {
                required: true,
                message: "Vui lònng nhập số lượng tồn",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* DESCRIPTION */}
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lònng nhập mô tả sản phẩm",
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

export default ProductsPage;
