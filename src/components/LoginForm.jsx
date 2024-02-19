import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const onFinish = async (values) => {
  //     await loginUser(values, dispatch, navigate);
  //   };

  const onFinishFailed = () => {
    console.error("form submission failed");
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: "40vw",
          margin: "auto",
          marginBlock: "10%",
          marginInline: "15%",
        }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="user_id"
          rules={[{ required: true, message: "Please input your user id!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;
