import {Header} from "../../../layouts/index"
import {withRouter} from "react-router-dom"
import {useEffect, useState} from "react"
import {makeStyles, Typography } from "@material-ui/core"
import axios from "axios"
import {e2p} from "../../../utils/LanGuaggeNumberConvertor.utils"
import {numberWithCommas} from "../../../utils/numberWithCommas.utils"
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {connect} from "react-redux"
import {addToCart} from "../../../redux/actions/user.action"
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme)=>({
    productInfo:{
        width:'100%',
        marginTop:theme.spacing(7),
        color:'var(--russian-violet)',
    },
    quantityInput:{
       width:'60px',
       marginLeft:theme.spacing(2)
    },
    cartButton:{
        height:'40px',
        lineHeight:'40px',
        padding:0,
        margin:0,
        border:'none',
        display:'flex',
        width:'200px',
        justifyContent: 'space-evenly',
        backgroundColor:'var(--light-cyan)',
        color:'var(--russian-violet)',
        borderRadius:'4px',
        border:'2px solid var(--russian-violet)',
        boxSizing:'border-box',
        height:'40px',
        lineHeight:'36px',
    },
    lineHeight:{
        lineHeight:'40px',
        height:'40px',
        display: 'inline-block',
    },
    productMainInfo:{
        display:'flex',
        flexDirection:'row-reverse',
        width:'700px',
        margin:'auto',
    },
    productCategory:{
        display:'flex',
        justifyContent: 'space-between',
        paddingRight:theme.spacing(2),
    },
    productPrice:{
        textAlign:'right',
        paddingRight:theme.spacing(2),
        direction:'rtl'
    },
    productActions:{
        display:'flex',
        justifyContent: 'space-between',
        paddingRight:theme.spacing(2),
        marginTop:theme.spacing(2)
    },
    productDescription:{
        textAlign:'right',
        width:'700px',
        margin:'auto',
    },
    productName:{
        paddingRight:theme.spacing(2),
        textAlign:'right'
    },
    productImage:{
        width:'300px',
        height:'168px',
        overflow: 'hidden',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productImageItem:{
        width:'100%'
    }
}))

function ProductDetailPageComponent(props){
    const classes = useStyles();

    const [ productsState, setProductsState] = useState({ })
    const [ cartcount, setCartCount] = useState({ quantity:1 })

    useEffect( async () =>{
        const response = await axios.get(`http://localhost:3001/products/${props.match.params.productId}`)
        const product = response.data
        console.log(props.userCart)
        await setProductsState(product)
    }, [])

    useEffect(()=>{
        console.log(props.userCart)
        localStorage.cart = JSON.stringify(props.userCart)
    }, [props.userCart])

    const addToCartButtonClickHandler = async (event,product)=>{
        const response = await axios.get(`http://localhost:3001/products/${product.id}`)
        const productInCart = props.userCart.find(prod=>prod.id===product.id)
        console.log(cartcount.quantity, response.data.quantity)
        if(response.data.quantity>0)
            if( (!productInCart) ||  cartcount.quantity<=response.data.quantity ){
                props.addToCart(product, +cartcount.quantity)
                return 
            }
        toast.error('متاسفانه موجودی محصول کافی نیست.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            rtl: true,
        });
    }

    const cartQuantityChangeHandler = (event)=>{
        event.target.value = event.target.value.replaceAll(/[.-]/g, '')
        setCartCount({ quantity: event.target.value})
    }

    const {name, description, image, group, headgroup, price, id} = productsState
    return (
        <div>
            <Header/>
            <main>
                <section className={classes.productInfo}>
                    <div className={classes.productMainInfo}>
                        <div className={classes.productImage}>
                            <img className={classes.productImageItem} src={`http://localhost:3001${image}`}/>
                        </div>
                        <div>
                            <Typography className={classes.productName} variant="h4" component="h1">{name}</Typography>
                            <div className={classes.productCategory}>
                                <Typography variant="h6" component="p">{group}</Typography>
                                <Typography variant="h6" component="p">{headgroup}</Typography>
                            </div>
                            <Typography variant="h5" component="p" className={classes.productPrice}>{e2p(numberWithCommas(''+price))} تومان</Typography>
                            <div className={classes.productActions}>
                                <button className={[classes.cartButton]} onClick={(event)=>addToCartButtonClickHandler(event, {name,price:+price,id})}>
                                    <ControlPointIcon className={classes.lineHeight}/><div className={classes.lineHeight}>افزودن به سبد خرید</div>
                                </button>
                                <input onChange={cartQuantityChangeHandler} value={cartcount.quantity} min="1" className={classes.quantityInput} type="number" />
                            </div>
                        </div>
                    </div>
                    <Typography className={classes.productDescription} variant="h5" component="p">{description}</Typography>
                </section>
            </main>
            <ToastContainer rtl={true}/>
        </div>
    )
}

const mapStateToProps = ({user:{cart}}) => ({userCart:cart})
const mapDispatchToProps = (dispatch) => ({
    addToCart:(product, count) => dispatch(addToCart(product, count))
})

const ProductDetailPage = connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetailPageComponent))
export {ProductDetailPage}