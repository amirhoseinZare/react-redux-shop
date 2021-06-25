import {useState, useEffect} from "react"
import classes from "./ProductInput.module.scss"

function ProductInput(props){
    const {editModeProducts, product, field, value} = props
    const {id:productId} = product
    const [productState, setProductsState] = useState({value:props.value, mode:'default'})

    const inputValueHandler = event => {
        console.log('hello')
        setProductsState({...productState, value:event.target.value})
    }

    const inoutButtonClickHandler = event => {
        setProductsState({...productState, mode:'edit'})
    }

    useEffect( ()=>{
        const {value, mode} = productState
        const foundProdIndex = editModeProducts.findIndex((prod)=>prod.id === productId )
        if(foundProdIndex===-1 && mode==='edit'){
            editModeProducts.push({id:productId, [field]:+value})
        }
        console.log(editModeProducts)
    },[productState] )

    return (
        productState.mode === 'default' 
            ? <button onClick={inoutButtonClickHandler} className={classes.productInputRead}>{productState.value}</button> 
            : <input type="number" value={productState.value} onChange={inputValueHandler} className={classes.productInput}/>
    )
}

export {
    ProductInput
}