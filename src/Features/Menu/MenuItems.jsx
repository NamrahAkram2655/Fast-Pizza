import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../Cart/CartSlice';
import DelBtn from '../Cart/delBtn';
import UpdateCartItems from '../Cart/UpdateCartItems';

const MenuItems = ({ pizza }) => {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

    
    const dispatch = useDispatch();
    
    const handleAddToCart = () => {
        const newItem = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: 1 * Number(unitPrice),
        }
        
        dispatch(addItem(newItem));
    }
    
    const currentQuantity = useSelector(store => store.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0);

    return (
        <li className='flex gap-4'>

            <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale' : ''}`} />

            <div className='flex justify-between items-center grow' >
                <div className='flex flex-col'>

                    <p>{name}</p>
                    <p className='text-sm italic capitalize'>{ingredients.join(', ')}</p>
                    <div className='mt-auto'>
                        {!soldOut ? <p>({unitPrice})</p> : <p>Sold out</p>}
                    </div>
                </div>

                {currentQuantity > 0 &&
                    <>
                        <UpdateCartItems pizzaId={id} />
                        <DelBtn pizzaId={id} />
                    </>
                }

                {!soldOut && !currentQuantity && <button className="bg-yellow-500 capitalize font-semibold text-xm text-stone-700 rounded-full tracking-wide hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 p-2 h-8 disabled:cursor-not-allowed" onClick={handleAddToCart}>

                    Add to cart

                </button>}
            </div>

        </li>
    );
}

MenuItems.propTypes = {
    pizza: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        unitPrice: PropTypes.number.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        soldOut: PropTypes.bool,
        imageUrl: PropTypes.string
    }).isRequired
};

export default MenuItems;
