import {useState} from "react"
import classes from "./ProductInput.module.scss"

function ProductInput(props){
    const [productState, setProductsState] = useState({value:props.value, mode:'default'})

    const inputValueHandler = event => setProductsState({...productState, value:event.target.value})

    const inoutButtonClickHandler = event => setProductsState({...productState, mode:'edit'})

    return (
        productState.mode === 'default' 
            ? <button onClick={inoutButtonClickHandler} className={classes.productInputRead}>{productState.value}</button> 
            : <input type="number" value={productState.value} onChange={inputValueHandler} className={classes.productInput}/>
    )
}

export {
    ProductInput
}