import { Button, Form, Input, Switch } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFloor } from "../features/floorSlice";

export const CreateFloor = ({ onCloseModal }) => {
  const token = useSelector((state) => state.login.token);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinish = async ({ name, floor_no, active }) => {
    await dispatch(createFloor({ token, name, floor_no, active }));
    onCloseModal();
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["floor_no"]}
        label="Floor Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const EditFloor = ({ onEditFloor, initialValues }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  //   console.log("initialValues", initialValues);
  //   initialValues = { initialValues };

  useEffect(() => {
    initialValues &&
      form.setFieldsValue({
        name: initialValues.name || "",
        floor_no: initialValues.floor_no || "",
        active: initialValues.active || false,
        uid: initialValues.uid || "",
      });
  }, []);

  const onFinish = (values) => {
    onEditFloor(values);
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["floor_no"]}
        label="Floor Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        hidden
        name={["uid"]}
        label="UID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
