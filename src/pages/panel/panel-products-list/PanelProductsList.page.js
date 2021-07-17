import {useState} from "react"
import {PanelHeader} from "../../../layouts/index"
import {ProductsTable, ProductModal} from "../../../components/index"
import {Typography, Button, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import product from "../../../model/products.model"

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
    const [modalOpenHandler, setModalOpenHandler] = useState({modalHandler:null})
    const [modalMode, setModalMode] = useState({mode:null, data:null})

    const openModalButtonHandler = async ()=>{
        await setModalMode({...modalMode,mode:'add'})
        modalOpenHandler.modalHandler()
    }

    const openModalEditButtonHandler = async (row)=>{
        await setModalMode({data:row,mode:'edit'})
        modalOpenHandler.modalHandler()
    }

    const openModalDeleteButtonHandler = async (row)=>{
        await setModalMode({...modalMode,mode:'delete'})
        await product.delete(row.id)
        setModalMode({...modalMode, mode:'default'})
    }

    return (
        <div>
            <PanelHeader/>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}  onClick={openModalButtonHandler}>
                <Button variant="contained" color="primary" onClick={()=>console.log('hi')}>افزودن کالا</Button>
                <Typography variant="h4" component="p">مدیریت کالا ها</Typography>
            </Grid>
            <ProductsTable 
                openModalEditButtonHandler={openModalEditButtonHandler} 
                openModalDeleteButtonHandler={openModalDeleteButtonHandler} 
                mode={modalMode.mode} 
            />
            <ProductModal setModalOpenHandler={setModalOpenHandler} mode={modalMode.mode} product={modalMode.data} setMode={setModalMode}/>
        </div>
    )
}

export {PanelProductsList}