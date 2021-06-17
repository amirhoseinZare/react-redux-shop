import styles from "./PanelHeader.module.scss"
import {ReactComponent as Logo} from "../../assets/icons/logo.svg"

function PanelHeader(){
    return (
        <header className={styles['panel-header']}>
            <div className={styles['header-logo']}>
                <h1>پنل مدیریت فروشگاه</h1>
                <div>{<Logo className={styles['logo']}/>}</div>
            </div>
            <nav className={styles['header-navigation']}>
                <div><a href="#">بازگشت به سایت</a></div>   
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