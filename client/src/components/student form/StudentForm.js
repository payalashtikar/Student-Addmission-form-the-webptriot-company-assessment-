import React, { Fragment, useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Upload, } from "antd";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const { Option } = Select;

const StudentForm = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState("");
    const Navigate = useNavigate();

    const uploadImage = async (options) => {
        const { file } = options;
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "payal_cloudinaryImage")
        data.append("cloud_name", "dmodq8klr")
        let resp = await fetch(
            "https://api.cloudinary.com/v1_1/dmodq8klr/image/upload",
            {
                method: "POST",
                body: data,
            }
        );
        resp = await resp.json();
        console.log(" resp : ", resp);
        setImage(resp.url);
    };
    useEffect(() => {
        if (image) {
            onFinish();
        }
    },);

    const onFinish = async (values) => {
        console.log(values, "values");
        let result = await fetch("http://localhost:8080/createdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rollNo: values.rollNo,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                address: values.address,
                gender: values.gender,
                subject: values.subject,
                profilePhoto: image,
            }),
        });
        result = await result.json();
        console.log("result : ", result);
        if (result.error) {
            console.log("result.error : ", result.error)
        } else {
            form.resetFields();
        }
        Navigate('/')

        return result

    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <Link to='/'>
                <ArrowBackIcon style={{ padding: '5px', margin: '5px 5px 5px 15px' }} />
            </Link>
            <Form
                form={form}
                name="basic"
                layout={"vertical"}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                style={{ width: '500px', margin: '0 auto', padding: '10px' }}

            >
                <Form.Item label="Roll No." name="rollNo"
                >
                    <Input />
                </Form.Item>
                <Form.Item label="First Name" name="firstName">
                    <Input />
                </Form.Item>

                <Form.Item label="Last Name" name="lastName">
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>

                <Form.Item label="Address" name="address">
                    <Input />
                </Form.Item>

                <Form.Item name="gender" label="Gender">
                    <Select placeholder="Please Select (optional)" allowClear={true}>
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Subject" name="subject">
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Profile Photo"
                    name="profilePhoto"
                >
                    <Upload
                        showUploadList={true}
                        listType="picture-card"
                        accept="image/*"
                        customRequest={uploadImage}
                    >
                        <div>
                            <div style={{ marginTop: 8 }}>Drop/Upload Files Here</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item shouldUpdate>
                    {() => (
                        <Fragment>
                            <Button
                                style={{ width: "25%", padding: "5px" }}
                                type="primary"
                                htmlType="submit"
                            >
                                Create
                            </Button>

                            <Button
                                style={{ width: "25%", padding: "5px", marginLeft: "10px" }}
                                htmlType="button"
                                onClick={() => form.resetFields()}
                            >
                                {" "}
                                Reset
                            </Button>
                        </Fragment>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};

export default StudentForm;
