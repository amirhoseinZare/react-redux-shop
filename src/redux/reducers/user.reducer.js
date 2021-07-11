import UserActionTypes from "../types/user.types";

const INITIAL_STATE = {
    cart:[]
}

const useReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.ADD_TO_CART:
            const productToAdd = action.product
            const products = state.cart
            const productIndex = products.findIndex(prod => prod.id===productToAdd.id)
            if(productIndex===-1){
                return { ...state, cart:[...state.cart, {...action.payload, count:1}] };
            }
            products[productIndex].count += 1
            return { ...state, cart:[...products] };
        case UserActionTypes.REMOVE_FROM_CART:
            const productToRemove = action.product
            const products = state.cart
            const productIndex = products.findIndex(prod => prod.id===productToRemove.id)
            if(productIndex!==-1){
                const newProducts = products.splice(productIndex,1)
                return { ...state, cart:[...newProducts] };
            }
            return state
        default:
            return state;
    }
}

export default useReducer