import { Link } from 'react-router-dom';
import CartItems from './CartItems';
import { useDispatch, useSelector } from 'react-redux';
import { clearcart } from './CartSlice';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];


function Cart() {

  const getCart = useSelector((state) => state.cart.cart);

  const cart = getCart;


  const name = useSelector(state => state.user.username);

  const dispatch = useDispatch();
  const clearCartHandler = () => {
    dispatch(clearcart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">

      <Link to="/menu" className='text-sm text-blue-500 hover:text-blue-800 hover:underline'>&larr; Back to menu</Link>

      <h2 className='mt-6 font-semibold text-xl my-3'>Your cart, {name}</h2>

      <ul className='divide divide-y divide-stone-300 border-b'>
        {cart.map((item,i) => (
          <CartItems item={item} key={i} />
        ))}
      </ul>

      <div className='mt-4 space-x-3'>
        <Link to="/order/new" className='bg-yellow-400 rounded-full py-1 px-2 text-sm'>
          Order pizzas
        </Link>


        <button className='bg-stone-400 text-stone-100 py-1 px-2 rounded-full focus:outline-none text-sm hover:bg-stone-500' onClick={clearCartHandler}>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;