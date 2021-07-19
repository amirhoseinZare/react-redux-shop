import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Typography, MenuItem, Select, FormControl, TextField, Input } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import modules from "./ProductsModal.module.scss"
import {TextEditor} from "../../components/index"
import productApi  from "../../model/products.model"
import groupApi from "../../model/groups.model"

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    display: 'flex',
    justifyContent:'space-between',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalHeader:{
    width: 600,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  productGroup:{
    width: 190,
    display: 'flex',
    direction:'rtl',
    marginBottom: '20px'
  },
  modalCloseButton:{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor:'transparent', 
      color:'red', 
      width:'25px', 
      height:'25px',
      border:'none'
    },
    productInputContainer:{
        display: 'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        direction:'rtl',
        marginBottom: '20px'
    },
    modalFooter:{
        width:600,
        textAlign:'center',
        marginTop: '100px'
    },
    productInoutLabel:{
        margin:'0 0 5px 0'
    },
    productImageContainer:{
        width:'50px',
        height:'50px',
        overflow:'hidden',
    },
    priceAndQuantityContainer:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
    }
}));

export default function ProductModal(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const [productState, setProductState] = useState({product:{
        id:'', name:'', group:'', headgroup:'', image:'', price:'', quantity:'', description:''
    }})

    const setProductDescription = (val)=>{
        setProductState({product:{...productState.product, description:val}})
    }

    const [groupsState, setGroupsState] = useState([])

    const handleOpen = async () => {
        setOpen(true);
        const groups = await groupApi.gets()
        await setGroupsState(groups.data)
    };

    const handleClose = () => {
        setOpen(false);
        setMode('default')
    };

    const inputChangeHandler = (event, name) => {
        setProductState({product:{...productState.product, [name]:event.target.value}})
    }

    useEffect(async ()=>{
        const groups = await groupApi.gets()
        await setGroupsState(groups.data)
        await props.setModalOpenHandler({modalHandler:handleOpen})
    },[])

    useEffect(async()=>{
        if(props.mode==='edit'){
            console.log('bale')
            const {id, name, group, headgroup, image, description} = props.product
            await setProductState({product:{id, name, group, headgroup, image, description}})
        }
        if(props.mode==='add'){
            await setProductState({product:{
                id:'', name:'', group:'', headgroup:'', image:''
            }})
        }
    }
    ,[props.mode])

    const inputEl = useRef(null)

    const submitButtonHandler = async(event, product) => {
        event.preventDefault()
        const {mode} = props
        console.log(mode)
        const {name , description, group, id, price} = product
        const headgroup = groupsState.find(g => g.name === group).headgroup
        let operationSuccess = false
        console.log(inputEl.current.files[0])
        if(mode==='edit'){
            const formdata = new FormData();
            if(inputEl.current.files[0])
                formdata.append("image", inputEl.current.files[0]);
            formdata.append("name", name);
            formdata.append("group", group);
            formdata.append("headgroup", headgroup);
            formdata.append("description", description);
            await productApi.patch(id, formdata)
            operationSuccess = true
        }
        else if (mode==='add'){
            console.log('in add')
            const formdata = new FormData();
            console.log(inputEl)
            formdata.append("image", inputEl.current.files[0]);
            formdata.append("name", name);
            formdata.append("group", group);
            formdata.append("headgroup", headgroup);
            formdata.append("description", description);
            formdata.append("price", price);
            formdata.append("quantity", quantity);
            await productApi.post(formdata)
            operationSuccess = true
        }
        if(operationSuccess){
            window.location.reload();
        }
        handleClose()
    }

    useEffect( async ()=>{
        console.log(inputEl)
    }, [inputEl])

    const {id, name, description, group, price, quantity} = productState.product
    const body = (
        <div className={classes.paper} style={modalStyle}>
            <header className={classes.modalHeader}>
                <button type="button" onClick={handleClose} className={classes.modalCloseButton}>
                    <Cancel />
                </button>
                <Typography>افزودن / ویرایش کالا</Typography>
            </header>
            <form>

                <div className={classes.productInputContainer}>
                    <label className={classes.productInoutLabel}>نام کالا:</label>
                    <TextField dir="rtl" placeholder="مثال : بیسکوییت" type="text" variant="outlined" value={name} onChange={(event)=>inputChangeHandler(event, 'name')}/>
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <span className={classes.productInoutLabel}>:تصویر کالا</span>
                    <label className={modules.input_file_label}>
                        <span className={modules.upload_button}>Browse</span>
                        <input onChange={()=>console.log(inputEl)} ref={inputEl} id='input' type="file" className={modules.input_file} accept='image/*'  onChange={(event)=>inputChangeHandler(event, '')}/>
                        <span className={modules.file_name} >file</span>
                    </label>
                </div>
                
                
                <div className={classes.priceAndQuantityContainer}>

                    <FormControl className={classes.productGroup}>
                        <label  className={classes.productInoutLabel}>دسته بندی:</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="outlined"
                            value={group}
                            onChange={(event)=>inputChangeHandler(event , 'group')}
                        >
                            {
                                groupsState.length>0 ? groupsState.map(group =><MenuItem key={id} value={group.name}>{group.name}</MenuItem>) : null
                            }
                        </Select>
                    </FormControl>

                    {
                        props.mode==='add' ? (<><div className={classes.productInputContainer}>
                                <label className={classes.productInoutLabel}>موجودی:</label>
                                <TextField style={{width:'190px'}} dir="rtl" type="number" variant="outlined" value={quantity} onChange={(event)=>inputChangeHandler(event, 'quantity')}/>
                            </div>

                            <div className={classes.productInputContainer}>
                                <label className={classes.productInoutLabel}>قیمت:</label>
                                <TextField style={{width:'190px'}} dir="rtl" type="number" variant="outlined" value={price} onChange={(event)=>inputChangeHandler(event, 'price')}/>
                            </div></>) : null
                    }
                </div>

                <div className={classes.productInputContainer}>
                    <label className={classes.productInoutLabel}>توضیحات کالا:</label>
                    <TextEditor handleChange={setProductDescription} defaultText={description} />
                </div>

                <footer className={classes.modalFooter}>
                    <Button  type="submit" color="primary" background="primary" onClick={(event)=>submitButtonHandler(event,  productState.product)}>ذخیره</Button>
                </footer>
            </form>
        </div>
        
    );

    const {setMode} = props;
    return (
        <div>
        <Modal
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            onClose={handleClose}
        >
            {body}
        </Modal>
        </div>
    );
}

export {
    ProductModal
}