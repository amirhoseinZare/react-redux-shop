import {useState, useEffect} from "react"
import classes from "./ProductInput.module.scss"

function ProductInput(props){
    const {editModeProducts, product, field, value, setEditModeProducts } = props
    const {id:productId} = product
    const [productState, setProductsState] = useState({value:props.value, mode:'default'})

    const inputValueHandler = event => {
        console.log('hello')
        setProductsState({...productState, value:event.target.value})
    }

    const inoutButtonClickHandler = event => {
        setProductsState({...productState, mode:'edit'})
    }

    useEffect( async()=>{
        const {value, mode} = productState
        const foundProdIndex = editModeProducts.findIndex((prod)=>prod.id === productId )
        let editModeProductsValue = []
        if(mode==='edit'){
            if(foundProdIndex===-1){
                editModeProducts.push({id:productId, [field]:+value})
                editModeProductsValue = [...editModeProducts]
            }
            else {
                editModeProductsValue = [...editModeProducts]
                editModeProductsValue[foundProdIndex][field] = +value
            }
        }
        await setEditModeProducts([...editModeProductsValue])
        console.log(editModeProducts)
    },[productState] )


    useEffect( async ()=>{
        if(props.editmode.edit==='done'){
            await setProductsState({...productState, mode:'default'})
        }
        console.log(props.editmode, props.editmode==='done')
    }, [props.editmode])

    return (
        productState.mode === 'default' 
            ? <button onClick={inoutButtonClickHandler} className={classes.productInputRead}>{productState.value}</button> 
            : <input type="number" value={productState.value} onChange={inputValueHandler} className={classes.productInput}/>
    )
}

export {
    ProductInput
}