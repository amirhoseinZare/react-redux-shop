import UserActionTypes from "../types/user.types"

const addToCart = (product, count) => ({
    type:UserActionTypes.ADD_TO_CART,
    payload:{product:product, count:count}
})

const removeFromCart = (product) => ({
    type:UserActionTypes.REMOVE_FROM_CART,
    payload:product
})

const emptyUserCart = () => ({
    type:UserActionTypes.EMPTY_USER_CART
})

export {
    addToCart,
    removeFromCart,
    emptyUserCart
}