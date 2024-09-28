import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {decrementItem, incrementItem } from './CartSlice';

function UpdateCartItems({ pizzaId }) {

    const currentQuantity = useSelector((state) =>
        state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0
    );

    const dispatch = useDispatch();

    return (
        <div className="flex items-center gap-2 md:gap-3">

            <button className="bg-yellow-500 capitalize font-semibold text-xm text-stone-700 rounded-full tracking-wide hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 p-2 h-8 disabled:cursor-not-allowed" onClick={() => dispatch(decrementItem(pizzaId))}>-</button>

            <span className="text-sm font-medium">{currentQuantity}</span>

            <button className="bg-yellow-500 capitalize font-semibold text-xm text-stone-700 rounded-full tracking-wide hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 p-2 h-8 disabled:cursor-not-allowed" onClick={() => dispatch(incrementItem(pizzaId))}>+</button>

        </div>
    );
}

// Define PropTypes for UpdateCartItems
UpdateCartItems.propTypes = {
    pizzaId: PropTypes.number.isRequired,
    // currentQuantity: PropTypes.number.isRequired,
};

export default UpdateCartItems;
