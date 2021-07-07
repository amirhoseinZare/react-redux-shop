import {PanelHeader} from "../../../layouts/index"
import {QuantityTable} from "../../../components/index"
import {Typography, Button, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import axios from "axios"

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

    useEffect(async () =>{
        console.log(editingProductsState)
    }, [editingProductsState])

    const saveButtonClickHandler = async (event) => {
        setEditMode({edit:'start'})
        console.log(editingProductsState)
        editingProductsState.forEach(async({id, quantity, price}, index)=>{
            const obj = {}
            if(quantity)
                obj.quantity = quantity 
            if(price)
                obj.price = price
            console.log(id, obj)
            if(index===editingProductsState.length-1){
                await axios.patch(`http://localhost:3001/products/${id}`, {...obj})
                await setEditMode({edit:'done'})
            }
            else {
                axios.patch(`http://localhost:3001/products/${id}`, {...obj})
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