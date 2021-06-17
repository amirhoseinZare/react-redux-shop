import {Link} from "react-router-dom"
import styles from "./Header.module.scss"
import { ReactComponent as ShoppingIcon } from "../../assets/icons/shop-logo.svg"
import { ReactComponent as ShoppingCartIcon } from "../../assets/icons/shopping-cart.svg"

function Header(){
    // cartNumber = 0

    return (
        <header className={styles['main-header']}>
            <div className={styles['main-header--logo']}>
                <h1>فروشگاه فلان</h1>
                <div className={styles['main-header--logo__icon']}><ShoppingIcon/></div>
            </div>
            <nav className={styles['main-navigation']}>
                <ul>
                    <li>
                        <div className={styles['cart-container']}>
                            <span className={styles['cart-count']}>0</span>
                            <span className={styles['cart-text']}>سبد خرید</span>
                            <div className={styles['cart-icon']}><ShoppingCartIcon/></div>
                        </div>
                    </li>
                    <li>
                        <a>مدیریت</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export {
    Header
}