import PropTypes from 'prop-types';
import DelBtn from './delBtn';
import UpdateCartItems from './UpdateCartItems';

function CartItem({ item }) {

    const { pizzaId, name, quantity, totalPrice } = item;

    return (
        <li className='py-2'>
            <p>
                {quantity}&times; {name}
            </p>
            <div className='flex justify-between items-center'>

                <p className='font-bold text-sm'>${totalPrice}</p>

                <UpdateCartItems pizzaId={pizzaId} />

                <DelBtn pizzaId={pizzaId} />

            </div>
        </li>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        pizzaId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired,
    }).isRequired,
};

export default CartItem;
