import React, { useState } from 'react';
import { message, notification, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BookDetail from './book.detail';
import BookUpdateByControl from './book.update.control';
import BookUpdateUnControl from './book.update.uncontrol';
import { deleteBookAPI } from '../../services/api.service';

const BookTable = (props) => {

    const { current, pageSize, setCurrent, setPageSize, total,
        dataBook, loadBooks, onHandleUploadFile, setPreview,
        preview, selectedFile, setSelectedFile, loadingTable
    } = props

    const [isOpenDetailBook, setIsOpenDetailBook] = useState(false)
    const [dataDetailBook, setDataDetailBook] = useState(null)

    // stateUpdate
    const [isUpdateBookOpen, setIsUpdateBookOpen] = useState(false);
    const [dataUpdateBook, setDataUpdateBook] = useState(null);

    // change page
    const onChange = (pagination, filters, sorter, extra) => {
        // setCurrent, setPageSize
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(pagination.current) // "1" ==> 1
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(pagination.pageSize) // "5" ==> 5
            }
        }

    };

    // deleteBook
    const handleDeleteBook = async (id) => {
        // id ==> record._id
        const resDeleteBook = await deleteBookAPI(id)
        if (resDeleteBook.data) {
            message.success("Delete Book Success !")
            loadBooks()
        } else {
            notification.error({
                message: "Delete Book Error!",
                description: JSON.stringify(resDeleteBook.message)
            })
        }
    }

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {/* index + (2-1) x 10  */}
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        onClick={() => {
                            setDataDetailBook(record)
                            console.log("check detail record : ", record)
                            setIsOpenDetailBook(true)
                        }}
                        href='#'>{record._id}
                    </a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text) {
                    return new Intl.NumberFormat("vi-VN",
                        { style: "currency", currency: "VND" }
                    ).format(text)
                }

            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => {
                            setDataUpdateBook(record)
                            setIsUpdateBookOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Delete User"
                        description="Bạn chắc chắn muốn xóa người dùng ?"
                        onConfirm={() => handleDeleteBook(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined
                            style={{ cursor: "pointer", color: "red" }}
                        />
                    </Popconfirm>

                </div>
            ),
        },
    ];





    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBook}
                onChange={onChange}
                loading={loadingTable}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
            />
            <BookDetail
                isOpenDetailBook={isOpenDetailBook}
                setIsOpenDetailBook={setIsOpenDetailBook}
                dataDetailBook={dataDetailBook}
                setDataDetailBook={setDataDetailBook}
            />

            {/* <BookUpdateByControl
                loadBooks={loadBooks}
                dataUpdateBook={dataUpdateBook}
                setDataUpdateBook={setDataUpdateBook}
                isUpdateBookOpen={isUpdateBookOpen}
                setIsUpdateBookOpen={setIsUpdateBookOpen}
                onHandleUploadFile={onHandleUploadFile}
                setPreview={setPreview}
                preview={preview}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
            /> */}

            <BookUpdateUnControl
                setIsUpdateBookOpen={setIsUpdateBookOpen}
                isUpdateBookOpen={isUpdateBookOpen}
                setSelectedFile={setSelectedFile}
                loadBooks={loadBooks}
                onHandleUploadFile={onHandleUploadFile}
                dataUpdateBook={dataUpdateBook}
                selectedFile={selectedFile}
                setDataUpdateBook={setDataUpdateBook}



            />
        </>
    )
}

export default BookTable;