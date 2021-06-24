import {PanelHeader} from "../../../layouts/index"
import {OrdersTable} from "../../../components/index"
import { Typography, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container:{
        margin:'20px auto 0',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    radioContainer:{
        
    }
});

function PanelOrdersPage (){
    const classes = useStyles();

    const handleChange = ()=>{

    }

    return (
        <div>
            <PanelHeader/>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value='' onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
                <Typography variant="h5" component="p">مدیریت سفارش ها</Typography>
            </Grid>
            <OrdersTable/>
        </div>
    )
}

export {PanelOrdersPage}