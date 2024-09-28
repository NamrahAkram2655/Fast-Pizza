import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Features/User/UserSlice";
import CartSlice from "../Features/Cart/CartSlice";

const store = configureStore({
    reducer:{
        user : UserSlice,
        cart : CartSlice,
    }
})

export default store;