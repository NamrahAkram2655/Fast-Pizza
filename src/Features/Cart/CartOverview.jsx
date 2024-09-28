import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartOverview() {

  const totalCartQuantity = useSelector((state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  );

  const totalCartPrice = useSelector((state) =>
    state.cart.cart.reduce((total, item) => total + item.totalPrice, 0)
  );

  if (!totalCartQuantity) return;
  
  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4 sm:p-5 text-sm md:text-base flex items-center justify-between">
      <p className="font-semibold space-x-4 sm:space-x-6">

        <span>{totalCartQuantity} Pizzas</span>
        <span>${totalCartPrice}</span>

      </p>
      <Link to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;