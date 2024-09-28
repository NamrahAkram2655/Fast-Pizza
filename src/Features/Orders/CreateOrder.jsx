// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../API/getMenu";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../Cart/EmptyCart";
import { clearcart } from "../Cart/CartSlice";
import store from '../../StoreRedux/store'
import { useState } from "react";
import { fetchAddress } from "../User/UserSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

// const fakeCart = [
//     {
//         pizzaId: 12,
//         name: "Mediterranean",
//         quantity: 2,
//         unitPrice: 16,
//         totalPrice: 32,
//     },
//     {
//         pizzaId: 6,
//         name: "Vegetale",
//         quantity: 1,
//         unitPrice: 13,
//         totalPrice: 13,
//     },
//     {
//         pizzaId: 11,
//         name: "Spinach and Mushroom",
//         quantity: 1,
//         unitPrice: 15,
//         totalPrice: 15,
//     },
// ];

function CreateOrder() {

    const dispatch = useDispatch();

    const formErrors = useActionData();

    const [withPriority, setWithPriority] = useState(false);

    const getCart = useSelector((state) => state.cart.cart);

    // const cart = getCart;

    // const cart = fakeCart;

    const totalCartPrice = useSelector((state) =>
        state.cart.cart.reduce((total, item) => total + item.totalPrice, 0)
    );
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

    const finalamout = priorityPrice + totalCartPrice;

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    const { username, status, position, address, error } = useSelector(state => state.user);

    const loading = status === 'loading';

    if (!getCart.length) return <EmptyCart />


    return (
        <div className="px-4 py-6">

            <h2 className="text-xl font-semibold mb-4">Ready to order? Lets go!</h2>


            {/* <Form method="POST"> */}
            <Form method="POST" action="/order/new">
                <div className="sm:flex sm:items-center my-4">
                    <label className="sm:basis-40">First Name</label>
                    <input type="text" name="customer" defaultValue={username} className="input w-full" required />
                </div>

                <div className="sm:flex sm:items-center my-4">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow w-full">
                        <input type="tel" name="phone" className="input w-full" required />
                    </div>
                </div>
                <p className="font-semibold text-red-700 bg-red-200 rounded-full px-3 text-center">
                    {formErrors?.phone && (
                        <div className="font-semibold text-red-700 bg-red-200 rounded-full px-3 text-center">
                            {formErrors.phone}
                        </div>
                    )}
                </p>

                <div className="sm:flex sm:items-center my-4">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow w-full">
                        <input type="text" name="address" defaultValue={address} className="input w-full" disabled={loading} required />
                    </div>
                </div>

                {!position.latitude && !position.longitude && <button className="bg-yellow-400 text-stone-600 rounded-full px-3 py-2" onClick={() => dispatch(fetchAddress())} disabled={loading}>get position</button>}

                {status === 'error' && (
                    <div className="font-semibold text-red-700 bg-red-200 rounded-full px-3 text-center">
                        {error}
                    </div>
                )}

                <div className="flex items-center gap-4 mb-12">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        className="accent-yellow-400 h-6 w-6 focus:outline-none mr-3 my-2"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority">Want to yo give your order priority?</label>
                </div>

                <div>
                    <button className="bg-yellow-500 uppercase font-semibold text-stone-700 py-3 px-4 rounded-full tracking-wide hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed" disabled={isSubmitting}>

                        {isSubmitting ? 'submitting...' : `Order now of $${finalamout}`}

                    </button>
                </div>
                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(getCart)} />
                    <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}` : ''} />

                </div>
            </Form>
        </div>
    );
}

export async function createOrderAtion({ request }) {

    const formdata = await request.formData();

    const data = Object.fromEntries(formdata);

    console.log(data);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "true",
    }

    console.log("Cart data:", order);

    // console.log(order);
    
    const errors = {};
    if (!isValidPhone(order.phone)) {
        errors.phone = 'Please give us your correct phone number , we might need it for contacting you';
    }


    if (Object.keys(errors).length > 0) {
        return errors;
    }

    const newOrder = await createOrder(order);

    store.dispatch(clearcart());

    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;