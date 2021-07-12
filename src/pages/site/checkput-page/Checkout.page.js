import {Header} from "../../../layouts/index"
import {TextField, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        width:'60%',
        margin: '50px auto'
    },
    input:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        margin:'20px 0'
    },
    textField:{
        width:'80%',
        margin:'7px 0',
        direction:'rtl',
    },
    buttonContainer:{
        textAlign: 'center'
    },
    payButton:{
        padding:'10px 25px',
        backgroundColor:'var(--lavender-floral)',
        border:'2px solid var(--russian-violet)',
        color:'var(--russian-violet)'
    }
}));

function CheckoutPage (){

    const classes = useStyles();

    return (
        <div>
            <Header/>

            <div className={classes.container}>
                <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                    <div className={classes.input}>
                        <div>
                            <label for="family-name">:نام خانوادگی</label>
                        </div>
                        <TextField className={classes.textField} id="family-name" variant="outlined" />
                    </div>
                </Grid>

                <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                    <div className={classes.input}>
                        <div>
                            <label for="name">:نام</label>
                        </div>
                        <TextField className={classes.textField} id="name" variant="outlined" />
                    </div>
                </Grid>

                <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                    <div className={classes.input}>
                        <div>
                            <label for="phone">:تلفن همراه</label>
                        </div>
                        <TextField className={classes.textField} id="phone" variant="outlined" />
                    </div>
                </Grid>

                <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                    <div className={classes.input}>
                        <div>
                            <label for="address">:آدرس</label>
                        </div>
                        <TextField className={classes.textField} id="address" variant="outlined" />
                    </div>
                </Grid>

                <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                    <div className={classes.input}>
                        <div>
                            <label for="time" >:زمان تحویل</label>
                        </div>
                        <TextField className={classes.textField} id="time" variant="outlined" />
                    </div>
                </Grid>

            </div>

            <div className={classes.buttonContainer}>
                <button className={classes.payButton}>پرداخت</button>
            </div>
            
        </div>
    )
}

export {CheckoutPage}