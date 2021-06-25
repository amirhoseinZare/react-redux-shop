import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton ,Button, Modal, Typography, MenuItem, Select, FormControl, TextField, Input } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import modules from "./ProductsModal.module.scss"
import axios from "axios"

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
    width: 400,
    display: 'flex',
    justifyContent:'space-between',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalHeader:{
    width: 400,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  productGroup:{
    width: 400,
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
        width:400,
        textAlign:'center'
    },
    productInoutLabel:{
        margin:'0 0 5px 0'
    },
    productImageContainer:{
        width:'50px',
        height:'50px',
        overflow:'hidden',
    }
}));

export default function ProductModal(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const [productState, setProductState] = useState({product:{
        id:'', name:'', group:'', headgroup:'', image:''
    }})

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setMode('default')
    };

    const inputChangeHandler = (event, name) => {
        setProductState({product:{...productState.product, [name]:event.target.value}})
    }

    useEffect(()=>{
        props.setModalOpenHandler({modalHandler:handleOpen})
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
        console.log(props.mode)
    }
    ,[props.mode])

    const submitButtonHandler = (event, product) => {
        event.preventDefault()
        const {mode} = props
        console.log(mode)
        const {name , description, group, headgroup, image, id} = product
        if(mode==='edit'){
            axios.patch(`http://localhost:3001/products/${id}`, {
                    name , description, group, headgroup, image
            })
        }
        else if (mode==='add'){
            console.log('in add')
            axios.post(`http://localhost:3001/products`, {
                body:{
                    name , description, group, headgroup, image
                }
            })
        }
        handleClose()
    }

    const {id, name, group, headgroup, image, description} = productState.product

    const body = (
        <div className={classes.paper} style={modalStyle}>
            <header className={classes.modalHeader}>
                <button type="button" onClick={handleClose} className={classes.modalCloseButton}>
                    <Cancel />
                </button>
                <Typography>افزودن / ویرایش کالا</Typography>
            </header>
            <form>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <span className={classes.productInoutLabel}>:تصویر کالا</span>
                    <label className={modules.input_file_label}>
                        <span className={modules.upload_button}>Browse</span>
                        <input id='input' type="file" className={modules.input_file} accept='image/*'  onChange={(event)=>inputChangeHandler(event, '')}/>
                        <span className={modules.file_name} >file</span>
                    </label>
                </div>

                <div className={classes.productInputContainer}>
                    <label className={classes.productInoutLabel}>نام کالا:</label>
                    <TextField dir="rtl" placeholder="مثال : بیسکوییت" type="text" variant="outlined" value={name} onChange={(event)=>inputChangeHandler(event, 'name')}/>
                </div>
                
                <FormControl className={classes.productGroup}>
                    <label  className={classes.productInoutLabel}>دسته بندی:</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        variant="outlined"
                        value="sth"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.productInputContainer}>
                    <label className={classes.productInoutLabel}>توضیحات کالا:</label>
                    <TextField dir="rtl" type="text" variant="outlined" value={description} onChange={(event)=>inputChangeHandler(event, 'description')}/>
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