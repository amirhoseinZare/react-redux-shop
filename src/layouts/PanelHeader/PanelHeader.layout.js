import styles from "./PanelHeader.module.scss"

function PanelHeader(){
    return (
        <header className={styles['panel-header']}>
            <h1>پنل مدیریت فروشگاه</h1>
            <ul>
                <li>کالا ها</li>
                <li>موجودی</li>
                <li>قیمت ها</li>
            </ul>
            <div><a href="#">بازگشت به سایت</a></div>
        </header>
    )
}

export {
    PanelHeader
}