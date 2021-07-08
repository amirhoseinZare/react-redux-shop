import {Header} from "../../../layouts/index"
import {withRouter} from "react-router-dom"
import {useEffect, useState} from "react"
import {makeStyles, Typography } from "@material-ui/core"
import axios from "axios"
import {e2p} from "../../../utils/LanGuaggeNumberConvertor.utils"
import {numberWithCommas} from "../../../utils/numberWithCommas.utils"
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const useStyles = makeStyles((theme)=>({
    productInfo:{
        width:'100%',
        marginTop:theme.spacing(7),
        color:'var(--russian-violet)',
    },
    quantityInput:{
       width:'30px',
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
        overflow: 'hidden'
    }
}))

function ProductDetailPageComponent(props){
    const classes = useStyles();

    const [ productsState, setProductsState] = useState({ })

    useEffect( async () =>{
        const response = await axios.get(`http://localhost:3001/products/${props.match.params.productId}`)
        const product = response.data
        await setProductsState(product)
    }, [])

    const {name, description, image, group, headgroup, price} = productsState
    return (
        <div>
            <Header/>
            <main>
                <section className={classes.productInfo}>
                    <div className={classes.productMainInfo}>
                        <div className={classes.productImage}>
                            <img src={`http://localhost:3001${image}`}/>
                        </div>
                        <div>
                            <Typography className={classes.productName} variant="h4" component="h1">{name}</Typography>
                            <div className={classes.productCategory}>
                                <Typography variant="h6" component="p">{group}</Typography>
                                <Typography variant="h6" component="p">{headgroup}</Typography>
                            </div>
                            <Typography variant="h5" component="p" className={classes.productPrice}>{e2p(numberWithCommas(''+price))} تومان</Typography>
                            <div className={classes.productActions}>
                                <button className={[classes.cartButton]}>
                                    <ControlPointIcon className={classes.lineHeight}/><div className={classes.lineHeight}>افزودن به سبد خرید</div>
                                </button>
                                <input min="0" className={classes.quantityInput} type="number" />
                            </div>
                        </div>
                    </div>
                    <Typography className={classes.productDescription} variant="h5" component="p">{description}</Typography>
                </section>
            </main>
        </div>
    )
}

const ProductDetailPage = withRouter(ProductDetailPageComponent)
export {ProductDetailPage}