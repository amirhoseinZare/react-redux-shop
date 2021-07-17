import {Header} from "../../../layouts/index"
import {withRouter, Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {makeStyles, Typography } from "@material-ui/core"
import productApi from "../../../model/products.model"
import {e2p} from "../../../utils/LanGuaggeNumberConvertor.utils"
import {numberWithCommas} from "../../../utils/numberWithCommas.utils"
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {connect} from "react-redux"
import {addToCart} from "../../../redux/actions/user.action"
import { ToastContainer, toast } from 'react-toastify';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {Spinner} from "../../../components/index"
import groupApi from "../../../model/groups.model"

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
        justifyContent: 'flex-end',
        paddingRight:theme.spacing(2),
        margin:'15px 0'
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
        direction:'rtl',
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
    },
    productCategoryTitle:{
        display:'inline-flex',
        alignItems: 'center',
        marginLeft:'20px',
    },
    productCategoryTitleLink:{
        textDecoration:'none',
        color:'var(--lavender-floral)'
    },
    productSubCategoryTitle:{
        display:'inline-flex',
        alignItems: 'center',
        color:'var(--lavender-floral)'
    }
}))

function ProductDetailPageComponent(props){
    const classes = useStyles();

    const [ productsState, setProductsState] = useState({ })
    const [ cartcount, setCartCount] = useState({ quantity:1 })
    const [loading, setLoading] = useState({ show: true })
    
    useEffect( async () =>{
        const response = await productApi.get(props.match.params.productId)
        const product = response.data
        const groupResponse = await groupApi.gets({params:{name:product.group}})
        console.log(groupResponse.data)
        product.groupId = groupResponse.data.id
        await setProductsState(product)
        setLoading({show:false})
    }, [])

    useEffect(()=>{
        console.log(props.userCart)
        localStorage.cart = JSON.stringify(props.userCart)
    }, [props.userCart])

    const addToCartButtonClickHandler = async (event,product)=>{
        const response = await product.get(product.id)
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

    const {name, description, image, group, headgroup, price, id, groupId} = productsState

    const pageContent = (
            <main>
                <section className={classes.productInfo}>
                    <div className={classes.productMainInfo}>
                        <div className={classes.productImage}>
                            <img className={classes.productImageItem} src={`http://localhost:3001${image}`}/>
                        </div>
                        <div>
                            <Typography className={classes.productName} variant="h4" component="h1">{name}</Typography>
                            <div className={classes.productCategory}>
                                <Typography variant="h6" component="p" className={classes.productSubCategoryTitle}>{headgroup}</Typography>
                                <Typography variant="h6" component="p" className={classes.productCategoryTitle}>
                                    <ArrowLeftIcon style={{color:'var(--lavender-floral)'}}/>
                                    <Link to={`/product/group/${groupId}/${group}`} className={classes.productCategoryTitleLink}>{group}</Link>
                                </Typography>
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
                    <Typography className={classes.productDescription} variant="h5" component="p" dangerouslySetInnerHTML={{__html:description}}/>
                </section>
            </main>
    )

    const loadingUi = ((<div style={{display: 'flex', justifyContent: 'center', paddingTop:'50px'}} >
                            <Spinner spinnerColor='var(--russian-violet)'/>
                    </div>))

    return (
        <div>
            <Header/>
            { loading.show ? loadingUi : pageContent }
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