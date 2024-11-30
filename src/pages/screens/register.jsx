
import React from 'react';
import { Button, Form, Input, notification, Row, Col, Divider } from 'antd';
import { registerUserAPI } from '../../services/api.service';
import { Link, useNavigate } from "react-router-dom";


const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(values);

        const response = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        )
        if (response.data) {
            notification.success({
                message: "Register User",
                description: "Đăng ký người dùng thành công!"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Register User Error!",
                description: JSON.stringify(response.message)
            })
        }
    };

    return (
        < >
            <Form
                form={form}
                layout='vertical' // chieu doc
                onFinish={onFinish}
                style={{ margin: "15px" }}
            // onFinishFailed={onFinishFailed}
            >

                <h2 style={{ color: "blue", margin: "20px auto", textAlign: "center" }}>Đăng ký tài khoản</h2>
                <Row justify={'center'}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Full Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col xs={24} md={8}>
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
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: 'Please enter a valid phone number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col xs={24} md={8}>
                        <div>
                            <Button style={{ marginLeft: "0px" }} onClick={() => form.submit()} type='primary'>Register</Button>
                        </div>
                        <Divider />
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px" }} justify={'center'}>
                    <Col xs={24} md={8}>
                        You have an account ? <Link style={{ color: "blue", cursor: "pointer" }} to={"/login"}>Login is there</Link>
                    </Col>
                </Row>

            </Form>

        </>

    )
}

export default RegisterPage;