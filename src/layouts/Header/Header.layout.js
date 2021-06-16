function Header(){
    return (
        <header>
            <div>$</div>
            <h1>فروشگاه فلان</h1>
            <ul>
                <li>
                    <a>مدیریت</a>
                </li>
                <li>
                    <div>سبد خرید
                        <div>$</div>
                        <span>{0}</span>
                    </div>
                </li>
            </ul>
        </header>
    )
}

export {
    Header
}