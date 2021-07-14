import {PanelHeader} from "../../../layouts/index"
import {OrdersTable} from "../../../components/index"
import { Modal,Typography, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from "react"
import CloseIcon from '@material-ui/icons/Close';
import {e2p} from "../../../utils/LanGuaggeNumberConvertor.utils"
import {numberWithCommas} from "../../../utils/numberWithCommas.utils"
import {Link} from "react-router-dom"
import axios from "axios"

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
        width:'80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        margin: '10px auto'
    },
    table:{
        paddingTop: '30px'
    },
    tableContainer:{
        margin: '30px 20px'
    },
    deliveryButton:{
        border: 'none',
        backgroundColor:'var(--dark-blue)',
        padding:'10px 20px',
        color:'#fff'
    },
    modalDescriptionTypo:{
        width:'400px',
        textAlign:'left',
    },
    modalDescriptionTitle:{
        width:'200px',
        textAlign:'right',
    }
}));

function PanelOrdersPage (){
    const classes = useStyles();
    const [filterProducts, setFilterProducts] = useState({doneFilter:null})
    const [orderState, setOrder] = useState({item:{ name:'', familyName:'', address:'', phone:'', cost:'', deliveryDoneTime:'', deliveryRequestTime:'', products:[{}]}})

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

    const deliveryButtonHandler = async (e , orderId) => {
        console.log(orderId)
        await axios.patch(`http://localhost:3001/orders/${orderId}`, { deliveryDoneTime: + new Date().getTime(), delivered:true })
        window.location.reload()
    }

    const { name, familyName, address, phone, cost, deliveryDoneTime, deliveryRequestTime, createdAt } = orderState.item;
    const body = (
        <div className={classes.paper}>
            <div className={classes.modalHeader}>
                <button className={classes.modalButtonClose} onClick={handleClose}><CloseIcon style={{color:'#fff'}} /></button>
                <Typography>نمایش سفارش</Typography>
            </div>
            <div className={classes.modalBody}>
                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" className={classes.modalDescriptionTitle} >نام مشتری:</Typography>
                    <Typography dir="rtl" className={classes.modalDescriptionTypo}>{`${name} ${familyName}`}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" className={classes.modalDescriptionTitle} >آدرس:</Typography>
                    <Typography dir="rtl" className={classes.modalDescriptionTypo}>{address}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" className={classes.modalDescriptionTitle} >تلفن:</Typography>
                    <Typography dir="rtl" className={classes.modalDescriptionTypo}>{e2p(''+phone)}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" className={classes.modalDescriptionTitle} >زمان تحویل:</Typography>
                    <Typography dir="rtl" className={classes.modalDescriptionTypo}>{deliveryDoneTime ? new Date(deliveryDoneTime).toLocaleString('fa-IR') : "تحویل داده نشده."}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" className={classes.modalDescriptionTitle} >زمان سفارش:</Typography>
                    <Typography dir="rtl" className={classes.modalDescriptionTypo}>{deliveryRequestTime}</Typography>
                </div>

                <div className={classes.modalBodyItem}>
                    <Typography dir="rtl" variant="p" component="p" className={classes.modalDescriptionTitle} >زمان ثبت سفارش:</Typography>
                    <Typography dir="rtl" className={classes.modalDescriptionTypo}>{new Date(createdAt).toLocaleString('fa-IR')}</Typography>
                </div>

                <TableContainer  className={classes.tableContainer} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow style={{background:'var(--light-face)'}}>
                            <TableCell align="right">تعداد &times; قیمت</TableCell>
                            <TableCell className={classes.tableHeaders} align="right">تعداد</TableCell>
                            <TableCell className={classes.tableHeaders} align="right">قیمت</TableCell>
                            <TableCell className={classes.tableHeaders} align="right">کالا</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orderState.item.products.map((row, index) => (
                            <TableRow style={{backgroundColor:index%2===0?'#cfba93':'var(--light-face)'}} key={row.id}>
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
                { !orderState.item.delivered ? (<button className={classes.deliveryButton} onClick={event => deliveryButtonHandler(event , orderState.item.id)}>
                    تحویل شد
                </button>) : <p dir="rtl"> زمان تحویل: {new Date(+deliveryDoneTime).toLocaleString('fa-IR')}</p>
}
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