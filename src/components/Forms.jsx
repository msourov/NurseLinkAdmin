import { Button, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFloor } from "../features/floorSlice";
import { createWard } from "../features/wardSlice";
import FloorOptions from "../utils/FloorOptions";

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
    const res = await dispatch(createFloor({ token, name, floor_no, active }));
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

export const CreateWard = ({ onCloseModal }) => {
  const [floorOptions, setFloorOptions] = useState([]);
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

  // useEffect(() => {
  //   const fetchoptions = async () => {
  //     const res = await FloorOptions();
  //     setFloorOptions(res);
  //   };

  //   fetchoptions();
  // }, [onCloseModal]);
  const options = FloorOptions();
  const onFinish = async ({ name, floor_uid, active }) => {
    const res = await dispatch(createWard({ token, name, floor_uid, active }));
    console.log("create floor res", res);
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
        name={["floor_uid"]}
        label="Floor Uid"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: 120 }} options={options} />
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

export const EditWard = ({ onEditSubmit, initialVal }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  console.log("initialVal", initialVal);
  const floorOptions = FloorOptions();
  // console.log("floorOptions", floorOptions);
  useEffect(() => {
    initialVal &&
      form.setFieldsValue({
        name: initialVal.name || "",
        floor: initialVal.floor_uid || "",
        active: initialVal.active || false,
        uid: initialVal.uid || "",
      });
  }, [initialVal, form]);

  const onFinish = (values) => {
    const obj = {
      name: values.name,
      floor_uid: values.floor,
      uid: values.uid,
      active: values.active,
    };
    onEditSubmit(obj);
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
        name={["floor"]}
        label="Floor"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: 120 }} options={floorOptions} />
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
