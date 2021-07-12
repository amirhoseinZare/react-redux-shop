import {Header} from "../../../layouts/index"
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { useEffect, useState } from "react"
import {e2p} from "../../../utils/LanGuaggeNumberConvertor.utils"
import {numberWithCommas} from "../../../utils/numberWithCommas.utils"
import {Link} from "react-router-dom"

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
        color:'var(--lavender-floral)'
    },
    tableHeaders:{
        color:'var(--russian-violet)',
        backgroundColor:'var(--light-cyan)'
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

function CartPage (){
    const classes = useStyles();
    const rows = [{}]
    return (
        <div>
            <Header/>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <Typography variant="h4" component="p" className={classes.title}>سبد خرید</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaders}></TableCell>
                            <TableCell className={classes.tableHeaders} align="right">تعداد</TableCell>
                            <TableCell className={classes.tableHeaders} align="right">قیمت</TableCell>
                            <TableCell className={classes.tableHeaders} align="right">کالا</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow className={classes.tableBody} key={row.name}>
                            <TableCell component="th" scope="row">
                                <button className={classes.deleteButton}>حذف</button>
                            </TableCell>
                            <TableCell align="right">{e2p(numberWithCommas(''+42353))}</TableCell>
                            <TableCell align="right">{e2p(numberWithCommas(''+434642))}</TableCell>
                            <TableCell align="right">
                                <Link className={classes.productLink}>کفش ۱</Link>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.cartInfo}>
                    <button className={classes.buyButton}>نهایی کردن سبد خرید</button>
                    <div className={classes.cartPrice}>
                        <p className={classes.cartPriceTypography}>جمع:</p>
                        <div className={classes.cartPriceCost}>12,432</div><span>تومان</span>
                    </div>
                </div>
            </Grid>
        </div>
    )
}

export {CartPage}
