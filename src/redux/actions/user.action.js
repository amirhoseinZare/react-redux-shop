import UserActionTypes from "../types/user.types"

const addToCart = (product) => ({
    type:UserActionTypes.ADD_TO_CART,
    payload:product
})

const removeFromCart = (product) => ({
    type:UserActionTypes.REMOVE_FROM_CART,
    payload:product
})

export {
    addToCart,
    removeFromCart
}