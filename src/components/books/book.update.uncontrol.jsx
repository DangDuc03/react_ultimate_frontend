import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { updateBookAPI, UploadFileAPI } from "../../services/api.service";

const BookUpdateUnControl = (props) => {
    const { loadBooks, onHandleUploadFile, isUpdateBookOpen, selectedFile, setSelectedFile, setIsUpdateBookOpen, dataUpdateBook, setDataUpdateBook } = props

    const [preview, setPreview] = useState()
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdateBook && dataUpdateBook._id) {
            form.setFieldsValue({
                id: dataUpdateBook._id,
                mainText: dataUpdateBook.mainText,
                author: dataUpdateBook.author,
                price: dataUpdateBook.price,
                quantity: dataUpdateBook.quantity,
                category: dataUpdateBook.category
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdateBook.thumbnail}`)
        }

    }, [dataUpdateBook])

    const resetCloseAndClearData = () => {
        setIsUpdateBookOpen(false);
        setSelectedFile(null)
        setPreview(null)
        setDataUpdateBook(null)
        form.resetFields();
    }



    const updateBook = async (newThumbnail, value) => {
        const { id, mainText, author, price, quantity, category } = value;
        const resUpdateBook = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category)
        if (resUpdateBook.data) {
            resetCloseAndClearData()
            await loadBooks()
            notification.success({
                message: "Update Book Success!",
                description: "Cập nhật sách thành công !"
            })
        } else {
            notification.error({
                message: "Update Book Error!",
                description: JSON.stringify(resUpdateBook.message)
            })
        }
    }


    const onFinishUpdateBook = async (value) => {
        // no file and no preview
        if (!preview && !selectedFile) {
            notification.error({
                message: "Update Book Error!",
                description: "Vui lòng chọn ảnh sản phẩm !"
            })
            return;
        }

        let newThumbnail = ""

        // have preview and no file ==> no upload file
        if (preview && !selectedFile) {
            // no upload image
            newThumbnail = dataUpdateBook.thumbnail
        } else {
            // have file and preview
            const resUploadFile = await UploadFileAPI(selectedFile, 'book')
            if (resUploadFile.data) {
                // success
                newThumbnail = resUploadFile.data.fileUploaded
            } else {
                // false
                notification.error({
                    message: "Upload File Error!",
                    description: JSON.stringify(resUploadFile.message)
                })
                return;
            }
        }

        // step 2:
        await updateBook(newThumbnail, value)
    }

    return (
        <>
            <Modal title="Update Book UnControl"
                open={isUpdateBookOpen}
                onOk={() => form.submit()}
                onCancel={resetCloseAndClearData}
                okText={"Update"}
            >

                <Form
                    form={form}
                    layout='vertical'
                    name="basic"
                    onFinish={onFinishUpdateBook}
                >
                    <Form.Item
                        label="ID"
                        name="id"

                    >
                        <Input disabled />
                    </Form.Item>
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

export default BookUpdateUnControl;