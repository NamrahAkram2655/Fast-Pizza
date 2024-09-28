import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        incrementItem(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decrementItem(state, action) {
           
            const item = state.cart.find(item => item.pizzaId === action.payload)
           
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice
           
            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
        },
        clearcart(state) {
            state.cart = []
        },
    }
})


export const { addItem, deleteItem, incrementItem, decrementItem, clearcart } = cartSlice.actions;
export default cartSlice.reducer;

