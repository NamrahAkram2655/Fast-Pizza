
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '../src/UI/Home';
import './App.css'
import Menu, { menuloader } from './Features/Menu/Menu';
import Cart from './Features/Cart/Cart';
import CreateOrder, { createOrderAtion} from './Features/Orders/CreateOrder';
import Order, { orderLoader } from './Features/Orders/Order';
import AppLayout from './UI/AppLayout';
import Error from './Features/Error/Error'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Menu",
        element: <Menu />,
        loader: menuloader,
        errorElement: <Error />,

      },
      {
        path: "/Cart",
        element: <Cart />
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action : createOrderAtion,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      }
    ]
  }

])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
