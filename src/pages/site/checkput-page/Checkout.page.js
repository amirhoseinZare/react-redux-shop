import {Header} from "../../../layouts/index"
import {TextField, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from "react"
import axios from "axios"
import {connect} from "react-redux"

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

function CheckoutPageComponent(props){

    const classes = useStyles();

    const [state, setState] = useState({
        name:'', familyName:'', address:'', phone:'', deliveryTime:'',
    })

    const channgInputHandler  = ({target:{value}}, name)=>{
        setState({...state, [name]:value })
    }

    console.log(props.userCart.reduce((acc, cv)=> acc + +cv.allPrice, 0))

    const submitHandler = async (event)=>{
        event.preventDefault()
        const { name, familyName, address, phone, deliveryTime } = state
        try {
            const response = await axios.post('http://localhost:3001/orders', { 
                name, 
                familyName, 
                address, 
                phone, 
                deliveryRequestTime:deliveryTime, 
                pay:false, 
                delivered:false,
                deliveryDoneTime:'', 
                cost:props.userCart.reduce((acc, cv)=> acc + +cv.allPrice, 0)
            })
            const { data:{id:orderId} } = response
            window.location.href = `http://localhost:4000/payment?order=${orderId}`
            setState({
                name:'', familyName:'', address:'', phone:'', deliveryTime:'',
            })                
        } catch (error) {
            console.log(error)
        }
    }

    const { name, familyName, address, phone, deliveryTime } = state

    return (
        <div>
            <Header/>
            <form onSubmit={submitHandler} noValidate>
                <div className={classes.container}>
                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                        <div className={classes.input}>
                            <div>
                                <label for="family-name">:نام خانوادگی</label>
                            </div>
                            <TextField onChange={e=>channgInputHandler(e, 'familyName')} value={familyName} className={classes.textField} id="family-name" variant="outlined" />
                        </div>
                    </Grid>

                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                        <div className={classes.input}>
                            <div>
                                <label for="name">:نام</label>
                            </div>
                            <TextField onChange={e=>channgInputHandler(e, 'name')} value={name} className={classes.textField} id="name" variant="outlined" />
                        </div>
                    </Grid>

                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                        <div className={classes.input}>
                            <div>
                                <label for="phone">:تلفن همراه</label>
                            </div>
                            <TextField onChange={e=>channgInputHandler(e, 'phone')} type="number" value={phone} className={classes.textField} id="phone" variant="outlined" />
                        </div>
                    </Grid>

                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                        <div className={classes.input}>
                            <div>
                                <label for="address">:آدرس</label>
                            </div>
                            <TextField onChange={e=>channgInputHandler(e, 'address')} value={address} className={classes.textField} id="address" variant="outlined" />
                        </div>
                    </Grid>

                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>  
                        <div className={classes.input}>
                            <div>
                                <label for="time" >:زمان تحویل</label>
                            </div>
                            <TextField onChange={e=>channgInputHandler(e, 'deliveryTime')} value={deliveryTime} className={classes.textField} id="time" variant="outlined" />
                        </div>
                    </Grid>

                </div>

                <div className={classes.buttonContainer}>
                    <button className={classes.payButton}>پرداخت</button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = ({user:{cart}})=>({userCart:cart})
const CheckoutPage = connect(mapStateToProps)(CheckoutPageComponent)
export {CheckoutPage}
