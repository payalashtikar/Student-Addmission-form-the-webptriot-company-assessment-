
import {
    Form,
    Input,
    Select,
    Upload,
    Button,
} from "antd";
import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateStudentData = ({ handleOnClose, initialValues }) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const params = useParams();
    const [pic, setPic] = useState("");
    const Navigate = useNavigate();
    const [image, setImage] = useState("");
    const [data, setData] = useState({
        rollNo: "",
        firstName: "",
        lastName: "",
        profilePhoto: ""
    });
    const { rollNo, firstName, lastName, profilePhoto } = data;

    useEffect(() => {
        getSingleEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getSingleEvent = async () => {
        let result = await fetch(`http://localhost:8080/singlestudent/${params.id}`, {
            method: "GET",
        });
        result = await result.json();
        console.log(result);
        setPic(result.profilePhoto);
        setData({
            rollNo: result.rollNo,
            firstName: result.firstName,
            lastName: result.lastName,
            // email: result.email,
            profilePhoto: result.profilePhoto
        });
    };

    const uploadImage = async (options) => {
        const { file } = options;
        console.log(file, "file");
        // image upload to cloudinary
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
        // console.log(resp);
        setImage(resp.url);
    };
    useEffect(() => {
        if (image) {
            UpdateEvent();
        }
    }, [image]);

    const UpdateEvent = async () => {
        try {
            let result = await fetch(`http://localhost:5011/updateuser/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rollNo: form.getFieldValue("rollNo"), // Accessing the value from the form
                    firstName: form.getFieldValue("firstName"),
                    lastName: form.getFieldValue("lastName"),
                    email: form.getFieldValue("email"),
                    address: form.getFieldValue("address"),
                    subject: form.getFieldValue("subject"),
                    gender: form.getFieldValue("gender"),
                    profilePhoto: image || pic,
                }),
            });

            result = await result.json();
            console.log(result);

            if (result.error) {
                console.log(result.error);
            } else {
                Navigate("/");
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    console.log(rollNo, firstName, lastName, profilePhoto);

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>

            <Link to='/'>
                <ArrowBackIcon style={{ padding: '5px', margin: '5px 5px 5px 15px' }} />
            </Link>


            <Form
                name="basic"
                initialValues={{
                    remember: true,
                    rollNo: rollNo,
                    firstName: firstName,
                    // ... other fields
                }}
                onFinish={UpdateEvent}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                form={form}
                style={{
                    width: "600px",
                    margin: "0 auto",
                    border: "2px solid #eee",
                    padding: "20px",
                }}
            >
                <Form.Item label="Roll No." name="rollNo">
                    <Input placeholder={rollNo} value={rollNo}/>
                </Form.Item>
                <Form.Item label="First Name" name="firstName">
                    <Input placeholder={firstName} value={firstName}/>
                </Form.Item>

                <Form.Item label="Last Name" name="lastName">
                    <Input placeholder={lastName} value={lastName} />
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
                                Update
                            </Button>
                            <Button
                                style={{ width: "25%", padding: "5px", marginLeft: "10px" }}
                                htmlType="button"
                                onClick={() => form.resetFields()}
                            >
                                Reset
                            </Button>
                        </Fragment>
                    )}
                </Form.Item>

            </Form>
        </div>
    );
};
export default UpdateStudentData;
