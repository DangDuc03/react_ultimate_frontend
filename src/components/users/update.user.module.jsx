import { useEffect, useState } from "react"
import { Input, notification, Modal } from "antd";
import { updateUserAPI } from "../../services/api.service";


const UpdateUserModal = (props) => {

    const [id, setID] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props

    useEffect(() => {
        if (dataUpdate) {
            setID(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhone(dataUpdate.phone)
        }

    }, [dataUpdate])

    const resetAndCloseModule = () => {
        setIsModalUpdateOpen(false)
        setID("")
        setFullName("")
        setPhone("")
        setDataUpdate(null)
    }

    const handleUpdateUser = async () => {
        const response = await updateUserAPI(id, fullName, phone)
        // response đã can thiệp từ interceptor
        if (response.data) {
            notification.success({
                message: "Update User!",
                description: "Cập nhật thành công !"
            })
            resetAndCloseModule();
            await loadUser(); //user await because in users.js loadUser used async
        } else {
            notification.error({
                message: "Error Update User!",
                description: JSON.stringify(response.message)
            })
        }
    }

    return (
        <>
            <Modal title="Update User"
                open={isModalUpdateOpen}
                onOk={() => handleUpdateUser()}
                onCancel={() => resetAndCloseModule()}
                maskClosable={false} // không cho phép click ra bên ngoài khi mở module
                okText={"UPDATE"}
            >
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                    <div>
                        <span>ID</span>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
                    <div>
                        <span>FullName</span>
                        <Input
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phone </span>
                        <Input
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default UpdateUserModal;