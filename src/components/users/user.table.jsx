import { Table, Popconfirm, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import UpdateUserModal from './update.user.module';
import { useState } from 'react';
import UserDetailModule from './user.detail.module';
import { deleteUserAPI } from '../../services/api.service';


const UserTable = (props) => {
    // get props
    const { dataUser, loadUser, current, pageSize, total, setCurrent, setPageSize, loadingTable } = props

    // stateUpdate
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    // State DetailUser
    const [isDetailModuleOpen, setIsDetailModuleOpen] = useState(false)
    const [detailModule, setDetailModule] = useState(null)




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
            // record giống như 1 bản ghi để ghi các user
            render: (_, record) => {
                return (
                    <a
                        onClick={() => {
                            setDetailModule(record)
                            console.log("check detail record : ", record)
                            setIsDetailModuleOpen(true)
                        }}
                        href='#'>{record._id}
                    </a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text) => <a>{text}</a>,

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Delete User"
                        description="Bạn chắc chắn muốn xóa người dùng ?"
                        onConfirm={() => handleDeleteUser(record._id)}
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

    const handleDeleteUser = async (id) => {
        const response = await deleteUserAPI(id)
        if (response.data) {
            notification.success({
                message: "Delete User!",
                description: "Xóa thành công !"
            })
            await loadUser() //used await because in users.js loadUser used async

        } else {
            notification.error({
                message: "Error Delete User!",
                description: JSON.stringify(response.message)
            })
        }
    }

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

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey={"_id"}
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
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <UserDetailModule
                detailModule={detailModule}
                setDetailModule={setDetailModule}
                isDetailModuleOpen={isDetailModuleOpen}
                setIsDetailModuleOpen={setIsDetailModuleOpen}
                loadUser={loadUser}

            />

        </>
    )
}

export default UserTable;