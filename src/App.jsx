import Header from './components/layout/header'
import Footer from './components/layout/footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './services/api.service'
import { useContext, useEffect } from 'react'
import { AuthContext } from './components/contexts/auth.context'
import { Spin } from 'antd';
import { RubyOutlined } from '@ant-design/icons'


const App = () => {

  const { setUserLogin, isAppLoading, setIsAppLoading } = useContext(AuthContext)


  useEffect(() => {
    fetchUserInfo()
  }, [])

  // demo code when call api delay
  // const Delay = (timeDelay) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, timeDelay)
  //   })
  // }

  const fetchUserInfo = async () => {
    const response = await getAccountAPI()
    // await Delay(3000)
    if (response.data) {
      setUserLogin(response.data.user)
    }
    setIsAppLoading(false)
  }

  return (
    <>
      {isAppLoading === true
        ? <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Spin size="large" />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    </>
  )
}

export default App
