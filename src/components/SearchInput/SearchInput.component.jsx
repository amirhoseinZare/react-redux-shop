import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from "./SerachInput.module.scss"
import {useState, useEffect} from "react"
import {debounce} from 'lodash';
import productApi from "../../api/products.api"
import {useHistory} from "react-router-dom"

export const SearchInput = () =>{
    const history = useHistory()
    const [state, setState] = useState({ options:[{name:''}] })

    const setProducts = async (value='', limit='')=>{
        const {data} = await  productApi.gets({ params:{ name_like: value, _limit:limit} })
        console.log(data)
        setState({ options:data})
    }
    const onAutoCompleteInputHandler = ({target:{value}}) => {
        debounce(async ()=>{
            await setProducts(value)
        }, 1500)()
    }

    useEffect(()=>{
        setProducts('', 0)
    }, [])

    const onAutoCompleteChangeHandler = ({target}) => { 
        const productIndex = target.getAttribute('data-option-index')
        console.log(productIndex)
        console.log(state.options)
        const product = state.options[productIndex]
        console.log(product)
        const path = `/product/${product.id}`
        history.push(path)
    }

    return (
        <div className={styles.searchInputContainer}>
            <Autocomplete
                onChange={onAutoCompleteChangeHandler}
                onInputChange={onAutoCompleteInputHandler}
                id="search-input"
                options={state.options}
                getOptionLabel={(option) => option.name}
                style={{ width: 400, marginTop:30 }}
                renderInput={(params) => <TextField placeholder="جستجوی محصولات" {...params} variant="outlined" />}
            />
        </div>

    )
}