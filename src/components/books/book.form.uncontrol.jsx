import { Button, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd";
import { useState } from "react";
import { createBookAPI, UploadFileAPI } from "../../services/api.service";

const BookFormUnControl = (props) => {
    const { loadBooks } = props
    const [preview, setPreview] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const onHandleUploadFile = (event) => {
        console.log("check event upload filebook: ", event)
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return;
        }
        const file = event.target.files[0]
        console.log("check files upload book: ", file)
        if (file) {
            setSelectedFile(file) // save file
            setPreview(URL.createObjectURL(file)) // create URL for File
        }
    }

    const resetCloseAndClearData = () => {
        setIsModalOpen(false);
        setSelectedFile(null)
        setPreview(null)
        form.resetFields();
    }

    const onFinish = async (values) => {
        const { mainText, author, price, quantity, category } = values

        if (!selectedFile) {
            notification.error({
                message: "Create Book Error!",
                description: "Vui lòng chọn ảnh sản phẩm !"
            })
            return;
        }
        // step 1. get url image
        const resUpload = await UploadFileAPI(selectedFile, "book")
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded
            // step 2. 
            const resCreateBook = await createBookAPI(thumbnail, mainText, author, price, quantity, category)
            if (resCreateBook.data) {
                resetCloseAndClearData()
                loadBooks()
                notification.success({
                    message: "Create Success Book",
                    description: "Tạo mới sách thành công"
                })
            } else {
                notification.error({
                    message: "Create Error Book!",
                    description: JSON.stringify(resCreateBook.message)
                })
            }
        } else {
            notification.error({
                message: "Create Image Error!",
                description: JSON.stringify(resUpload.message)
            })
        }
    };


    return (
        <>
            <div className="form-button" style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
                <p className="text-form-button" style={{ margin: 0, padding: 0, fontSize: "25px", fontWeight: 600 }}>Table User</p>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >Create Book</Button>
            </div>
            <Modal title="Create Book UnControl"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={resetCloseAndClearData}
                okText={"CREATE"}
            >

                <Form
                    form={form}
                    layout='vertical'
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mainText!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your author!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá Tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputNumber
                            min="0"
                            style={{
                                width: '100%',
                            }}
                            addonAfter="đ"
                        // defaultValue={0}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số Lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your quantity!',
                            },
                        ]}
                    >
                        <InputNumber
                            min="0"
                            // defaultValue={1}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your category!',
                            },
                        ]}
                    >
                        <Select
                            // defaultValue="Arts"
                            style={{
                                width: "100%",
                            }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },

                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },

                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>

                    <div>
                        <label
                            htmlFor="btnUpload"
                            style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                backgroundColor: "orange",
                                cursor: "pointer"
                            }}
                        >
                            Upload File
                        </label>
                        <input
                            onChange={(event) => onHandleUploadFile(event)}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            style={{ display: "none" }}
                            type="file" id="btnUpload" hidden />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                height: "100px",
                                width: "150px",
                                marginBottom: "15px"
                            }}
                            >
                                <img style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    src={preview} alt="Image Error" />
                            </div>
                        </>
                    }

                </Form>
            </Modal>
        </>
    )
}

export default BookFormUnControl;