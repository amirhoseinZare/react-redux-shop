import {PanelHeader} from "../../../layouts/index"
import {OrdersTable} from "../../../components/index"
import { Modal,Typography, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from "react"
import CloseIcon from '@material-ui/icons/Close';
import {e2p} from "../../../utils/LanGuaggeNumberConvertor.utils"

const useStyles = makeStyles((theme)=>({
    container:{
        margin:'20px auto 0',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    radioContainer:{
        display: 'flex',
        flexDirection:'row'
    },
    paper: {
        position: 'absolute',
        width: '600px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top:'50%', 
        left:'50%',
        transform: 'translate(-50%, -50%)'
    },
    modalButtonClose:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding:'0',
        backgroundColor:'red',
        border:'none',
        textAlign:'center',
        width:'25px',
        height:'25px',
        borderRadius:'50%'
    },
    modalHeader:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalBody:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'80%',
        margin: 'auto',
        flexDirection:'column',
    },
    modalBodyItem:{
        width:'50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        margin: '10px auto'
    }
}));

function PanelOrdersPage (){
    const classes = useStyles();
    const [filterProducts, setFilterProducts] = useState({doneFilter:null})
    const [orderState, setOrder] = useState({item:{ name:'', familyName:'', address:'', phone:'', cost:'', deliveryDoneTime:'', deliveryRequestTime:''}})

    const handleChange = ({target})=>{
        setFilterProducts({doneFilter:target.value})
    }

    const [open, setOpen] = useState(false);

    const handleOpen = async (order) => {
        await setOrder({item:order})
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
        const { name, familyName, address, phone, cost } = orderState.item;
        console.log(name, familyName, address, phone, cost)
    }, [orderState])


    const { name, familyName, address, phone, cost, deliveryDoneTime, deliveryRequestTime } = orderState.item;
    const body = (
        <div className={classes.paper}>
            <div className={classes.modalHeader}>
                <button className={classes.modalButtonClose} onClick={handleClose}><CloseIcon style={{color:'#fff'}} /></button>
                <Typography>نمایش سفارش</Typography>
            </div>
            <div className={classes.modalBody}>
                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" id="simple-modal-title">نام مشتری:</Typography>
                    <Typography dir="rtl" id="simple-modal-description">{`${name} ${familyName}`}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" id="simple-modal-title">آدرس:</Typography>
                    <Typography dir="rtl" id="simple-modal-description">{address}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" id="simple-modal-title">تلفن:</Typography>
                    <Typography dir="rtl" id="simple-modal-description">{e2p(''+phone)}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" id="simple-modal-title">زمان تحویل:</Typography>
                    <Typography dir="rtl" id="simple-modal-description">{new Date(deliveryDoneTime).toLocaleString('fa-IR')}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" id="simple-modal-title">زمان سفارش:</Typography>
                    <Typography dir="rtl" id="simple-modal-description">{new Date(deliveryRequestTime).toLocaleString('fa-IR')}</Typography>
                </div>

                <button>
                    تحویل شد
                </button>
            </div>
        </div>
      );

    return (
        <div>
            <PanelHeader/>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>

                <FormControl component="div">
                    <form>
                        <RadioGroup name="status" className={classes.radioContainer} onChange={handleChange}>
                            <FormControlLabel value="false" control={<Radio color="primary" name="status"/>} label="سفارش های در انتظار" />
                            <FormControlLabel value="true" control={<Radio color="primary" name="status"/>} label="سفارش های تحویل شده" />
                        </RadioGroup>
                    </form>
                </FormControl>
                <Typography variant="h5" component="p">مدیریت سفارش ها</Typography>
            </Grid>
            
            <OrdersTable filterProducts={filterProducts} modalHandleOpen={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

export {PanelOrdersPage}