import UserActionTypes from "../types/user.types";

const INITIAL_STATE = {
    cart:JSON.parse(localStorage.getItem('cart')) || []
}

const useReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.ADD_TO_CART:{
            const productToAdd = action.payload
            const products = state.cart
            console.log(state.cart)
            const productIndex = products.findIndex(prod => prod.id===productToAdd.id)
            if(productIndex===-1){
                return { ...state, cart:[...state.cart, {...action.payload, count:1, allPrice:+action.payload.price}]};
            }
            products[productIndex].count += 1
            products[productIndex].allPrice += +action.payload.price
            return { ...state, cart:[...products] };
        }
        case UserActionTypes.REMOVE_FROM_CART:{
            const productToRemove = action.payload
            const products = state.cart
            console.log(productToRemove, products)
            const productIndex = products.findIndex(prod => prod.id===productToRemove.id)
            console.log(productIndex)
            if(productIndex!==-1){
                products.splice(productIndex,1)
                return { ...state, cart:[...products] };
            }
            return {...state}
        }
        default:
            return state;
    }
}

export default useReducer