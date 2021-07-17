import {Header} from "../../../layouts/index"
import {Typography, Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom"
import {useEffect} from "react"
import order from "../../../model/orders.model"

const useStyles = makeStyles((theme) => ({
    header:{
        width:'70%',
        margin:'30px auto',
        textAlign:'right',
    },
    container:{
        display:'flex',
        width:'50%',
        justifyContent: 'center',
        margin:'auto',
        flexDirection:'row-reverse',
        alignItems: 'center'
    },
    paymentIcon:{
        position:'relative',
        width:'100px', 
        height:'100px',
        borderRadius:'50%',
        backgroundColor:'red',
        marginLeft:'40px'
    },
    paymentIconItem:{
        fill: '#ffff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        fontSize: 'xxx-large',
        transform: 'translate(-50%, -50%)'
    },
    backToCartPageLink:{
        textDecoration:'none',
        border:'1px solid var(--lavender-floral)',
        color:'var(--lavender-floral)'
    }
}));

function PaymentFailedPage(){

    const classes = useStyles();

    const urlParams = new URLSearchParams(window.location.search);
    useEffect(async ()=>{
        try {
            await order.get(urlParams.get('order'))
        } catch (error) {
            console.log(error)            
        }
    }, [])

    return (
        <div>
            <Header/>
            <Typography variant="h4" className={classes.header}>نتیجه ی پرداخت</Typography>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <div className={classes.paymentIcon}><CloseIcon className={classes.paymentIconItem}/></div>
                <Typography dir="rtl" variant="p" component="p">پرداخت موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است.</Typography>
            </Grid>
            <div style={{textAlign: 'center'}}>
                <Link className={classes.backToCartPageLink} to="/cart">برگشت به سبد خرید</Link> <Link className={classes.backToCartPageLink} to="/checkout">برگشت به صفحه ی خرید</Link>
            </div>
        </div>
    )
}

export {PaymentFailedPage}