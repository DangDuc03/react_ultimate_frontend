import { Button, Drawer } from "antd";
import { useState } from "react";

const BookDetail = (props) => {

    const { isOpenDetailBook, setIsOpenDetailBook, dataDetailBook, setDataDetailBook } = props


    const priceVND = () => {
        if (dataDetailBook.price) {
            return new Intl.NumberFormat("vi-VN",
                { style: "currency", currency: "VND" }
            ).format(dataDetailBook.price)
        }
    }

    return (
        <>
            <Drawer title="Chi tiết về sách"
                onClose={() => {
                    setIsOpenDetailBook(false)
                    setDataDetailBook(null)
                }}
                open={isOpenDetailBook}>
                {
                    dataDetailBook ?
                        <>
                            <p>ID: {dataDetailBook._id}</p><br />
                            <p>Tiêu đề : {dataDetailBook.mainText}</p><br />
                            <p>Tác giả : {dataDetailBook.author}</p><br />
                            <p>Thể loại : {dataDetailBook.category}</p><br />
                            <p>Giá tiền : {priceVND()}</p><br />
                            <p>Số lượng : {dataDetailBook.quantity}</p><br />
                            <p>Đã bán : {dataDetailBook.sold}</p><br />
                            <p>Hình ảnh : </p><br />
                            <div
                                style={{
                                    marginTop: "10px",
                                    height: "100px",
                                    width: "150px",
                                    border: "1px solid #ccc"
                                }}
                            >
                                <img style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetailBook.thumbnail}`} alt="Image Error" />
                            </div>
                        </>
                        :
                        <p>Khong co data</p>
                }
            </Drawer>
        </>
    )
}

export default BookDetail;