import { Button, Input, InputNumber, message, Modal, notification } from "antd"
import { useState } from "react"
import { Select } from 'antd';
import { createBookAPI, UploadFileAPI } from "../../services/api.service";

const BookForm = (props) => {

    const { loadBooks, selectedFile, preview, setSelectedFile, setPreview, onHandleUploadFile } = props
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetAndCloseModule = () => {
        setIsModalOpen(false)
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setSelectedFile(null)
        setPreview(null)
    }



    const createNewBook = async () => {

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
                resetAndCloseModule()
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
    }

    return (
        <>
            <div className="use-form" style={{ margin: "20px" }}>
                <div className="form-button" style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
                    <p className="text-form-button" style={{ margin: 0, padding: 0, fontSize: "25px", fontWeight: 600 }}>Table User</p>
                    <Button
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                    >Create Book</Button>
                </div>
                <Modal title="Create Book"
                    open={isModalOpen}
                    onOk={() => createNewBook()}
                    onCancel={() => resetAndCloseModule()}
                    maskClosable={false} // không cho phép click ra bên ngoài khi mở module
                    okText={"CREATE"}

                >
                    <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                        <div>
                            <span>Tiêu đề</span>
                            <Input
                                value={mainText}
                                onChange={(event) => setMainText(event.target.value)}
                            />
                        </div>
                        <div>
                            <span>Tác giả</span>
                            <Input
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                            />
                        </div>
                        <div>
                            <span>Giá Tiền</span><br />
                            <InputNumber
                                min="0"
                                style={{
                                    width: '100%',
                                }}
                                addonAfter="đ"
                                defaultValue={0}
                                value={price}
                                onChange={(value) => setPrice(value)}
                            />
                        </div>
                        <div>
                            <span>Số Lượng</span>
                            <InputNumber
                                min="0"
                                defaultValue={1}
                                style={{
                                    width: '100%',
                                }}
                                value={quantity}
                                onChange={(value) => setQuantity(value)}
                            />
                        </div>
                        <div>
                            <span>Thể loại</span><br />
                            <Select
                                defaultValue="Arts"
                                style={{
                                    width: "100%",
                                }}
                                value={category}
                                onChange={(value) => setCategory(value)}
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
                        </div>
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
                    </div>
                </Modal>

            </div>
        </>
    )
}

export default BookForm;