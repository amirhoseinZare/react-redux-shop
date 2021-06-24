import {PanelHeader} from "../../../layouts/index"
import {ProductsTable} from "../../../components/index"
import {Typography, Button, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container:{
        margin:'20px auto 0',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

function PanelProductsList (){
    const classes = useStyles();

    return (
        <div>
            <PanelHeader/>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <Button variant="contained" color="primary">افزودن کالا</Button>
                <Typography variant="h4" component="p">مدیریت کالا ها</Typography>
            </Grid>
            <ProductsTable/>
        </div>
    )
}

export {PanelProductsList}