import { Outlet, useNavigation } from "react-router-dom"
import CartOverview from "../Features/Cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader";

const AppLayout = () => {

  const navigation = useNavigation();
  console.log(navigation);
  const loading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">

      {loading && <Loader />}

      <Header />

      <div className="overflow-scroll">

        <main className="max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  )
}

export default AppLayout
