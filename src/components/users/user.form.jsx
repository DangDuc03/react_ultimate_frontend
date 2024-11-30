import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = (props) => {
    const { loadUser } = props
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const [phone, setPhone] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetAndCloseModule = () => {
        setIsModalOpen(false)
        setFullName("")
        setEmail("")
        setPassWord("")
        setPhone("")
    }

    const handleCreateUser = async () => {
        const response = await createUserAPI(fullName, email, password, phone)
        // response đã can thiệp từ interceptor
        if (response.data) {
            notification.success({
                message: "Create User",
                description: "Tạo mới người dùng thành công !"
            })
            resetAndCloseModule();
            await loadUser();
        } else {
            notification.error({
                message: "Error Create User!",
                description: JSON.stringify(response.message)
            })
        }
    }

    return (
        <div className="use-form" style={{ margin: "20px" }}>
            <div className="form-button" style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
                <p className="text-form-button" style={{ margin: 0, padding: 0, fontSize: "25px", fontWeight: 600 }}>Table User</p>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >Create User</Button>
            </div>
            <Modal title="Create User"
                open={isModalOpen}
                onOk={() => handleCreateUser()}
                onCancel={() => resetAndCloseModule()}
                maskClosable={false} // không cho phép click ra bên ngoài khi mở module
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                    <div>
                        <span>FullName</span>
                        <Input
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => setPassWord(event.target.value)}
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

        </div>
    )
}

export default UserForm;