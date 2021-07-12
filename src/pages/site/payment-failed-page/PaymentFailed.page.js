import {Header} from "../../../layouts/index"
import {Typography, Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"

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
        width:'100px', 
        height:'100px',
        borderRadius:'50%',
        backgroundColor:'red',
        marginLeft:'40px'
    },

}));

function PaymentFailedPage(){

    const classes = useStyles();

    return (
        <div>
            <Header/>
            <Typography variant="h4" className={classes.header}>نتیجه ی پرداخت</Typography>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <div className={classes.paymentIcon}></div>
                <Typography variant="p" component="p">نتیجه ی پرداخت</Typography>
            </Grid>
        </div>
    )
}

export {PaymentFailedPage}