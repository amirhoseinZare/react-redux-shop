import UserActionTypes from "../types/user.types";

const INITIAL_STATE = {
    cart:[]
}

const useReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.ADD_TO_CART:{
            const {product:productToAdd,count:producToAddCount } = action.payload
            const products = state.cart
            const productIndex = products.findIndex(prod => prod.id===productToAdd.id)
            if(productIndex===-1){
                return { ...state, cart:[...state.cart, {...productToAdd, count:producToAddCount, allPrice:+productToAdd.price*producToAddCount}]};
            }
            products[productIndex].count = producToAddCount
            products[productIndex].allPrice = +productToAdd.price * producToAddCount
            return { ...state, cart:[...products] };
        }
        case UserActionTypes.REMOVE_FROM_CART:{
            const productToRemove = action.payload
            const products = state.cart
            const productIndex = products.findIndex(prod => prod.id===productToRemove.id)
            if(productIndex!==-1){
                products.splice(productIndex,1)
                return { ...state, cart:[...products] };
            }
            return {...state}
        }
        case UserActionTypes.EMPTY_USER_CART:{
            return { ...state, cart:[]}
        }
        default:
            return state;
    }
}

export default useReducer