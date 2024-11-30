import { useContext } from "react"
import { AuthContext } from "../components/contexts/auth.context"
import { Link, Navigate } from "react-router-dom"
import { Button, Result } from "antd"

const PrivateRoute = (props) => {
    const { userLogin } = useContext(AuthContext)

    // phân quyền, nếu login rồi thì sẽ vào được những phần tử do thẻ này bọc
    if (userLogin && userLogin.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        <>
            {/*  nếu chưa login mà cố gắng nhấp vào thì sẽ chuyển về trang login */}
            {/* <Navigate to={"/login"} replace /> */}
            <Result
                status="404"
                title="UnAuthorize !"
                subTitle="Bạn cần đăng nhập để tuy cập nguồn tài nguyên này!"
                extra={<Button type="primary">
                    <Link href="/">
                        Back to home
                    </Link>
                </Button>}
            />
        </>
    )
}

export default PrivateRoute;