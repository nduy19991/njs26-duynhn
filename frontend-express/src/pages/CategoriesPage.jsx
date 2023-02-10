import React from "react";
import axios from "axios";
import { Form, Input, Button, Table, Space, Modal, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function CategoriesPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

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
      title: "Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
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
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectCategory(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="Ok"
              cancelText="Close"
              onConfirm={() => {
                deleteCategory(record._id);
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
    axios.get("http://localhost:9000/categories").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios.post("http://localhost:9000/categories", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
    });
  };

  const deleteCategory = (_id) => {
    axios.delete("http://localhost:9000/categories/" + _id).then((response) => {
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
    });
  };

  const selectCategory = (data) => {
    setEditModalVisible(true);
    setSelectedCategory(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const onEditFinish = (values) => {
    console.log(values);
    // CODE ANH CALL API TO HERE
    axios
      .patch("http://localhost:9000/categories/" + selectedCategory._id, values)
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
      <h1 style={{width:'16%', margin:'auto', fontSize:'35px', marginBottom:'50px'}}>Create Category</h1>
      </div>
      {/* CREATE FORM */}
      <Form
        form={createForm}
        name="create-category"
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
          label="Categoty"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter category",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description",
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
      <h1 style={{width:'15%', margin:'auto', fontSize:'35px', marginBottom:'50px'}}>Categories List</h1>
      </div>
      <Table
        rowKey={"_id"}
        dataSource={categories}
        columns={columns}
        pagination={false}
      />

      {/* UPDATE FORM */}
      <Modal
        open={editModalVisible}
        title="Edit category information"
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
          name="update-category"
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
          label="Category"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter category",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description",
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

export default CategoriesPage;
