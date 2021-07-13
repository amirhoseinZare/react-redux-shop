import {Header} from "../../../layouts/index"
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { useEffect, useState } from "react"
import {e2p} from "../../../utils/LanGuaggeNumberConvertor.utils"
import {numberWithCommas} from "../../../utils/numberWithCommas.utils"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {removeFromCart} from "../../../redux/actions/user.action"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    container:{
        margin:'100px auto 0'
    },
    title:{
        margin:'40px 0',
        textAlign:'right'
    },
    cartInfo:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteButton:{
        background:'transparent',
        color:'var(--russian-violet)',
        border:'none',
        textDecoration:'underline',
        cursor:'pointer'
    },
    productLink:{
        color:'var(--russian-violet)',
        border:'none',
        textDecoration:'underline',
        cursor:'pointer'
    },
    buyButton:{
        backgroundColor:'#fff',
        border:'2px solid var(--lavender-floral)',
        padding:'5px 10px',
        color:'var(--lavender-floral)',
        textDecoration:'none',
    },
    tableHeaders:{
        color:'var(--russian-violet)',
    },
    cartPrice:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row-reverse',
        color:'var(--lavender-floral)'
    },
    cartPriceTypography:{
        direction:'rtl',
        marginLeft:'15px',
        color:'var(--lavender-floral)'
    },
    cartPriceCost:{
        direction:'rtl',
        marginLeft:'7.5px',
    }
});

function CartPageComponent (props){
    const classes = useStyles();
 
    const removeFromcartButtonClickHandler = (event, row)=>{
        props.removeFromCart(row)
        localStorage.cart = JSON.stringify(props.userCart)
    }

    const finalizeCart = async (event)=>{
        event.preventDefault()
        let success = true
        console.log(props.userCart.map(prod=>axios.get(`http://localhost:3001/products/${prod.id}`)))
        await Promise.all(props.userCart.map(prod=>axios.get(`http://localhost:3001/products/${prod.id}`))).then((responses)=>{
            responses.forEach((response,index)=>{
                const product = response.data
                console.log(product,props.userCart[index], product.quantity<props.userCart[index].count)
                if(product.quantity<props.userCart[index].count){
                    success = false
                }
            })
        })
        if(success){
            props.history.push('/checkout')
        }
        else{
            toast.error('متاسفانه موجودی محصولات مورد انتخاب شما کافی نیست.', {
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
    }

    return (
        <div>
            <Header/>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <Typography variant="h4" component="p" className={classes.title}>سبد خرید</Typography>
                { props.userCart.length<1 ? <Typography dir="rtl" variant="h5" component="p" lassName={classes.title}>شما هنوز محصولی به سبد خرید خود اضافه نکرده اید.</Typography> : <>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaders}></TableCell>
                            <TableCell align="right">تعداد &times; قیمت</TableCell>
                            <TableCell className={classes.tableHeaders} align="right">تعداد</TableCell>
                            <TableCell className={classes.tableHeaders} align="right">قیمت</TableCell>
                            <TableCell className={classes.tableHeaders} align="right">کالا</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.userCart.map((row, index) => (
                            <TableRow style={{backgroundColor:index%2===0?'var(--beau-blue)':'var(--light-cyan)'}} key={row.id}>
                                <TableCell component="th" scope="row">
                                    <button className={classes.deleteButton} onClick={(event)=>removeFromcartButtonClickHandler(event, row)}>حذف</button>
                                </TableCell>
                                <TableCell align="right">{e2p(numberWithCommas('' + row.allPrice))}</TableCell>
                                <TableCell align="right">{e2p(numberWithCommas('' + row.count))}</TableCell>
                                <TableCell align="right">{e2p(numberWithCommas('' + row.price))}</TableCell>
                                <TableCell align="right">
                                    <Link className={classes.productLink} to={`/product/${row.id}`}>{row.name}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.cartInfo}>
                    <Link className={classes.buyButton} to="/checkout" onClick={finalizeCart}>نهایی کردن سبد خرید</Link>
                    <div className={classes.cartPrice}>
                        <p className={classes.cartPriceTypography}>جمع:</p>
                        <div className={classes.cartPriceCost}>{e2p(numberWithCommas(props.userCart.reduce((acc, cv) => acc + +cv.allPrice  , 0)))}</div><span>تومان</span>
                    </div>
                </div></> }
                
            </Grid>
            <ToastContainer />
        </div>
    )
}

const mapStateToProps = ({user:{cart}}) => ({userCart:cart})
const mapDispatchToProps = (dispatch) => ({removeFromCart:product=>dispatch(removeFromCart(product))})

const CartPage = connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPageComponent))
export {CartPage}