import {PanelHeader} from "../../../layouts/index"
import {OrdersTable} from "../../../components/index"
import { Typography, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {useState} from "react"

const useStyles = makeStyles({
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
    }
});

function PanelOrdersPage (){
    const classes = useStyles();
    const [filterProducts, setFilterProducts] = useState({doneFilter:null})

    const handleChange = ({target})=>{
        setFilterProducts({doneFilter:target.value})
    }

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
            <OrdersTable filterProducts={filterProducts}/>
        </div>
    )
}

export {PanelOrdersPage}