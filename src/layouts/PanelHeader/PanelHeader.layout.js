import styles from "./PanelHeader.module.scss"
import {ReactComponent as Logo} from "../../assets/icons/shop-logo.svg"
import {Link} from "react-router-dom"

function PanelHeader(){
    return (
        <header className={styles['panel-header']}>
            <div className={styles['header-logo']}>
                <h1>پنل مدیریت فروشگاه</h1>
                <div>{<Logo className={styles['logo']}/>}</div>
            </div>
            <nav className={styles['header-navigation']}>
                <div><Link to="/">بازگشت به سایت</Link></div>   
                <ul>
                    <li>کالا ها</li>
                    <li>موجودی</li>
                    <li>قیمت ها</li>
                </ul>
            </nav>
        </header>
    )
}

export {
    PanelHeader
}