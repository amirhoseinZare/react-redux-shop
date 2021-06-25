import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton ,Button, Modal, Typography, MenuItem, Select, FormControl, TextField, Input } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import modules from "./ProductsModal.module.scss"

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
    }
}));

export default function ProductModal(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        props.setModalOpenHandler({modalHandler:handleOpen})
    },[])

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
                        <input id='input' type="file" className={modules.input_file} accept='image/*' />
                        <span className={modules.file_name} >file</span>
                    </label>
                </div>  
                <div className={classes.productInputContainer}>
                    <label className={classes.productInoutLabel}>نام کالا:</label>
                    <TextField dir="rtl" placeholder="مثال : بیسکوییت" type="text" variant="outlined"/>
                </div>
                
                <FormControl className={classes.productGroup}>
                    <label  className={classes.productInoutLabel}>دسته بندی:</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        variant="outlined"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.productInputContainer}>
                    <label className={classes.productInoutLabel}>توضیحات کالا:</label>
                    <TextField dir="rtl" type="text" variant="outlined"/>
                </div>

                <footer className={classes.modalFooter}>
                    <Button  type="submit" color="primary" background="primary">ذخیره</Button>
                </footer>
            </form>
        </div>
        
    );

    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
        </div>
    );
}

export {
    ProductModal
}