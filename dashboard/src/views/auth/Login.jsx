import React, { useState } from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import logo from "../../assets/habtam.png";
import {
  GoogleOutlined,
  GithubOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { loginAsync } from "./authReducer";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log("Success:", values);
      const { payload } = await dispatch(loginAsync(values));
      console.log(payload, "response of login successful");
      localStorage.setItem("accessToken", payload?.token);
      localStorage.setItem("user", payload?.user);

      setLoading(false);
      message.success("Login successful");
      navigate("/");
    } catch (error) {
      message.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center  w-full h-full justify-center borde border-red-900 min-h-screen bg-gray-10">
      <div className="bg-white p-8 borde ml-[10%] border-green-900 shadow-g rounded-lg w- max--md ">
        <div className="mb-8 text-start">
          <img className="w-[10rem] " src={logo} />

          <p className="text-gray-500 mt-4">Welcome!</p>
          <h2 className="text-3xl font-bold mt-4">Log In</h2>
        </div>
        <Form
          wrapperCol={{ span: 24 }}
          labelCol={{ span: 24 }}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              placeholder="Email"
              className="rounded bg-blue-100"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="rounded bg-blue-100"
            />
          </Form.Item>

          {/* <div className="flex justify-between items-center">
            <Button type="link" className="text-gray-400">
              Forgot Password ?
            </Button>
          </div> */}

          <Form.Item>
            <button
              type="submit"
              className="w-full bg-[#168a53] py-2 px-2 hover:bg-[#267c54] text-white rounded"
            >
              {loading ? (
                <ClipLoader
                  color="#FFFFF"
                  loading={loading}
                  //  cssOverride={override}
                  className=" rounded-full"
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "LOGIN"
              )}
            </button>
          </Form.Item>
        </Form>

        {/* <div className="text-center text-gray-500 mb-4">or continue with</div>

        <div className="flex justify-center space-x-4 mb-4">
          <Button shape="circle" icon={<GoogleOutlined />} />
          <Button shape="circle" icon={<GithubOutlined />} />
          <Button shape="circle" icon={<FacebookOutlined />} />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
