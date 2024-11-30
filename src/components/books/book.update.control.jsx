import { Button, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { updateBookAPI, UploadFileAPI } from "../../services/api.service";


const BookUpdateByControl = (props) => {

    const [id, setId] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")

    const { isUpdateBookOpen, setIsUpdateBookOpen, dataUpdateBook, setDataUpdateBook,
        onHandleUploadFile, loadBooks, preview, setPreview, selectedFile, setSelectedFile } = props

    useEffect(() => {
        if (dataUpdateBook && dataUpdateBook._id) {
            setId(dataUpdateBook._id)
            setThumbnail(dataUpdateBook.thumbnail)
            setMainText(dataUpdateBook.mainText)
            setAuthor(dataUpdateBook.author)
            setPrice(dataUpdateBook.price)
            setQuantity(dataUpdateBook.quantity)
            setCategory(dataUpdateBook.category)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdateBook.thumbnail}`)
        }
    }, [dataUpdateBook])

    const resetAndCloseModule = () => {
        setId("")
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setSelectedFile(null)
        setPreview(null)
        setDataUpdateBook(null)
        setIsUpdateBookOpen(false)
    }

    const updateBook = async (newThumbnail) => {
        const resUpdateBook = await updateBookAPI(
            id, newThumbnail, mainText, author, price, quantity, category
        )
        if (resUpdateBook.data) {
            resetAndCloseModule()
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

    const handleClickUpdate = async () => {

        // no file and no preview
        if (!preview && !selectedFile) {
            notification.error({
                message: "Create Book Error!",
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
        await updateBook(newThumbnail)
    }




    return (
        <>
            <Modal title="Update Book Control" open={isUpdateBookOpen} onOk={() => handleClickUpdate()} onCancel={() => resetAndCloseModule()}>
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                    <div>
                        <span>ID</span>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
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
                            type="file" id="btnUpload" hidden
                            onChange={(event) => onHandleUploadFile(event)}
                            onClick={(event) => event.target.value = null}
                        />
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
        </>
    )
}

export default BookUpdateByControl;