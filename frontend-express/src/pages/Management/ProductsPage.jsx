import axios from "axios";
import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Modal,
  Space,
  Table,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import numeral from "numeral";

export default function ProductPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const [categories, setCategories] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  // Columns of Antd Table
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
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Category</div>;
      },
      dataIndex: "category",
      key: "category",
      width: "20%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>{record.category.name}</span>
          </div>
        );
      },
    },

    {
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Supplier</div>;
      },
      dataIndex: "supplier",
      key: "supplier",
      width: "20%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>{record.supplier.name}</span>
          </div>
        );
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "20%",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{text}</strong>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "6%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0$")}</span>
          </div>
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: "7%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0")}%</span>
          </div>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: "5%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0")}</span>
          </div>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "6%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <strong>{numeral(text).format("0,0$")}</strong>
          </div>
        );
      },
    },
    {
      title: "",
      key: "actions",
      width: "10%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectProduct(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="OK"
              cancelText="Close"
              onConfirm={() => {
                deleteProduct(record._id);
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
    axios.get("http://localhost:9000/suppliers").then((response) => {
      setSuppliers(response.data);
      // console.log(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/categories").then((response) => {
      setCategories(response.data);
      // console.log(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then((response) => {
      setProducts(response.data);
      // console.log(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);
    // CODE HERE ...
    // CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/products", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
      console.log(response.data);
    });
  };

  const onEditFinish = (values) => {
    console.log(values);
    // CODE HERE ...
    // CALL API TO CREATE CUSTOMER
    axios
      .patch("http://localhost:9000/products/" + selectedProduct._id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
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

  const deleteProduct = (_id) => {
    axios.delete("http://localhost:9000/products/" + _id).then((response) => {
      console.log(response);
      setRefresh((f) => f + 1);
    });
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <div>
      <div style={{ width: "100%" }}>
        <h1
          style={{
            width: "15%",
            margin: "auto",
            fontSize: "35px",
            marginBottom: "50px",
          }}
        >
          Create Product
        </h1>
      </div>
      {/* CREATE FORM  */}
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
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Please select product categpry",
            },
          ]}
        >
          <Select
            options={
              categories &&
              categories.map((c) => {
                return {
                  value: c._id,
                  label: c.name,
                };
              })
            }
          />
        </Form.Item>

        <Form.Item
          label="Supplier"
          name="supplierId"
          rules={[
            {
              required: true,
              message: "Please select product supplier",
            },
          ]}
        >
          <Select
            options={
              suppliers &&
              suppliers.map((c) => {
                return {
                  value: c._id,
                  label: c.name,
                };
              })
            }
          />
        </Form.Item>

        {/* NAME */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* PRICE */}
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input product price",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        {/* DISCOUNT */}
        <Form.Item
          label="Discount"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input product discount",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        {/* STOCK */}
        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            {
              required: true,
              message: "Please input product stock",
            },
          ]}
        >
          <InputNumber min={0} />
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
          Products List
        </h1>
      </div>
      <Table
        rowKey="_id"
        dataSource={products}
        columns={columns}
        pagination={false}
        style={{ width: "80%", margin: "auto" }}
      />

      {/* MODAL */}
      <Modal
        open={editModalVisible}
        centered
        title="Cập nhật thông tin"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Lưu thông tin"
        onOk={() => {
          updateForm.submit();
        }}
      >
        <Form
          form={updateForm}
          name="update-product"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          <Form.Item
            label="Danh mục sản phẩm"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please input product categpry!",
              },
            ]}
          >
            <Select
              options={
                categories &&
                categories.map((c) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="Nhà cung cấp"
            name="supplierId"
            rules={[
              {
                required: true,
                message: "Please input product supplier!",
              },
            ]}
          >
            <Select
              options={
                suppliers &&
                suppliers.map((c) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>

          {/* NAME */}
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PRICE */}
          <Form.Item
            label="Giá bán"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input product price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/* DISCOUNT */}
          <Form.Item
            label="Giảm (%)"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input product discount!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/* STOCK */}
          <Form.Item
            label="Tồn"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input product stock!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
