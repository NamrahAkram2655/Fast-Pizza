import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteItem } from './CartSlice';

const DelBtn = ({ pizzaId }) => {

    const dispatch = useDispatch();

    return (
        <button
            className='bg-stone-500 text-stone-200 rounded-full py-1 px-2 hover:bg-stone-600'
            onClick={() => dispatch(deleteItem(pizzaId))}>
            Delete
        </button>
    );
}

DelBtn.propTypes = {
    pizzaId: PropTypes.number.isRequired, // Ensure that pizzaId is a number and is required
};

export default DelBtn;
