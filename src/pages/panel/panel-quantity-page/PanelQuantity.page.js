import {PanelHeader} from "../../../layouts/index"
import {QuantityTable} from "../../../components/index"
import {Typography, Button, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";

const useStyles = makeStyles({
    container:{
        margin:'20px auto 0',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});


function PanelQuantityPage (){
    const classes = useStyles();

    const [ editingProductsState ,setEditingProductsState ] = useState([]);

    useEffect(async () =>{
        console.log(editingProductsState)
    }, [editingProductsState])

    return (
        <div>
            <PanelHeader/>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <Button variant="contained" color="primary">ذخیره</Button>
                <Typography variant="h4" component="p">مدیریت موجودی و قیمت ها</Typography>
            </Grid>
            <QuantityTable setEditingProductsState={setEditingProductsState} editingProductsState={editingProductsState}/>
        </div>
    )
}

export {PanelQuantityPage}