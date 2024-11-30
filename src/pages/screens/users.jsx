import UserForm from "../../components/users/user.form";
import UserTable from "../../components/users/user.table";
import { getAllUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUser, setDataUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5) // thực tế thì tối thiểu thường hiển thị 10 phần tử
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(null)

    useEffect(() => {
        loadUser()
    }, [current, pageSize])

    const loadUser = async () => {
        setLoadingTable(true)
        const response = await getAllUserAPI(current, pageSize)
        if (response.data) {
            setDataUser(response.data.result)
            setCurrent(response.data.meta.current)
            setPageSize(response.data.meta.pageSize)
            setTotal(response.data.meta.total)
        }
        setLoadingTable(false)
    }

    // lift up state
    return (
        <div style={{ padding: "20x" }}>
            <UserForm
                loadUser={loadUser}
            />
            <UserTable
                loadUser={loadUser}
                dataUser={dataUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                loadingTable={loadingTable}
            />
        </div>
    )
}

export default UserPage;