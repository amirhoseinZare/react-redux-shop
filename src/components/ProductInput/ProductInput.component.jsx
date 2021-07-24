import {useState, useEffect} from "react"
import classes from "./ProductInput.module.scss"

function ProductInput(props){
    const {editModeProducts, product, field, value, setEditModeProducts } = props
    const {id:productId} = product
    const [productState, setProductsState] = useState({value:props.value, mode:'default'})

    const inputValueHandler = event => {
        setProductsState({...productState, value:event.target.value})
    }

    const inoutButtonClickHandler = event => {
        setProductsState({...productState, mode:'edit'})
    }

    useEffect( ()=>{
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
        setEditModeProducts([...editModeProductsValue])
    },[productState] )


    useEffect( ()=>{
        const productStateSetter = async ()=>{
            if(props.editmode.edit==='done')
                setProductsState({...productState, mode:'default'})    
        }
        productStateSetter()
    }, [props.editmode])

    useEffect(async() =>{ 
        const productStateSetter = async ()=>{
            if(props.escapeState)
                setProductsState({value:props.value, mode:'default'})
        }
        productStateSetter()
    }, [props.escapeState])

    return (
        productState.mode === 'default' 
            ? <button onClick={inoutButtonClickHandler} className={classes.productInputRead}>{productState.value}</button> 
            : <input type="number" value={productState.value} onChange={inputValueHandler} className={classes.productInput}/>
    )
}

export {
    ProductInput
}