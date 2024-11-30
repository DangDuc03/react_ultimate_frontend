import React, { useContext, useState } from 'react';
import { Button, Form, Input, notification, Row, Col, Divider, message, } from 'antd';
import { json, Link, useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';
import { loginUserAPI } from '../../services/api.service';
import { AuthContext } from '../../components/contexts/auth.context';



const LoginPage = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const { setUserLogin } = useContext(AuthContext)


    const onFinish = async (values) => {
        console.log('Success with username and password:', values);
        setLoading(true)
        const res = await loginUserAPI(values.email, values.password)
        setLoading(false)
        if (res.data) {
            message.success("Đăng nhập thành công!")
            localStorage.setItem("access_token", res.data.access_token)
            setUserLogin(res.data.user)
            navigate("/")
        } else {
            notification.error({
                message: "Login Error!",
                description: JSON.stringify(res.message)
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify={"center"}>
            <Col xs={24} md={16} lg={8}>
                <fieldset
                    style={{
                        padding: " 15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "spx"
                    }}>
                    <legend style={{ color: "blue", fontSize: "20px", margin: "3px" }}>Đăng Nhập</legend>
                    <Form
                        form={form}
                        layout='vertical'
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ margin: "20px 0" }}

                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        form.submit()
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                <Button
                                    loading={loading}
                                    type="primary"
                                    onClick={() => form.submit()}>
                                    Submit
                                </Button>
                                <Link to={"/"}>Go to home page <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>

                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}> Do you not an account ? <Link to={"/register"}>Register</Link> </div>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;