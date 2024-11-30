import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/screens/login.jsx';
import BooksPage from './pages/screens/book.jsx';
import RegisterPage from './pages/screens/register.jsx';
import UserPage from './pages/screens/users.jsx';
import TodoApp from './components/Todo/todoApp.jsx';
import ErrorPage from './pages/screens/error.jsx';
import { AuthWrapper } from './components/contexts/auth.context.jsx';
import PrivateRoute from './routes/private.route.jsx';
import 'nprogress/nprogress.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <BooksPage />
          </PrivateRoute>
        ),
      },
    ]
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>,
)
