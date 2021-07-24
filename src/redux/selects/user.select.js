import { createSelector } from 'reselect'

const userCartSelector = state => state.user.cart

const cartSelector = createSelector(
    [userCartSelector],
    cart => cart
)

export { cartSelector }