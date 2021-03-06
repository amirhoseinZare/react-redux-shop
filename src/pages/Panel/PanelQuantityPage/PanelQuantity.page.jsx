import {PanelHeader} from "../../../layouts/index"
import {QuantityTable} from "../../../components/index"
import {Typography, Button, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import productApi from "../../../api/products.api";

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
    const [editmode, setEditMode ] = useState({edit:'end'});

    const saveButtonClickHandler = async (event) => {
        setEditMode({edit:'start'})
        editingProductsState.forEach(async({id, quantity, price}, index)=>{
            const obj = {}
            if(quantity>=0){
                obj.quantity = quantity
            }
            if(price)
                obj.price = price
            if(index===editingProductsState.length-1){
                await productApi.patch(id, {...obj})
                await setEditMode({edit:'done'})
            }
            else {
                productApi.patch(id, {...obj})
            }
        })
    }

    return (
        <div>
            <PanelHeader/>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <Button variant="contained" color="primary" onClick={(event)=>saveButtonClickHandler(event, editingProductsState)}>ذخیره</Button>
                <Typography variant="h4" component="p">مدیریت موجودی و قیمت ها</Typography>
            </Grid>
            <QuantityTable setEditingProductsState={setEditingProductsState} editingProductsState={editingProductsState} editmode={editmode}/>
        </div>
    )
}

export {PanelQuantityPage}