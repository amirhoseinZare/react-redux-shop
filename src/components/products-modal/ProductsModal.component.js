import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton ,Button, Modal, Typography, MenuItem, Select, FormControl, TextField, Input } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

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
    justifyContent: 'space-between'
  },
  modalBody:{
    width: 400,
    display: 'flex',
    direction:'rtl'
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
        direction:'rtl'
    },
    modalFooter:{
        width:400,
        textAlign:'center'
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
                <div className={classes.productInputContainer}>
                    <div>
                        <label>نام کالا</label>
                    </div>
                    <TextField dir="rtl" placeholder="مثال : بیسکوییت" type="text"/>
                </div>
                
                <FormControl className={`${classes.formControl}  ${classes.modalBody}`}>
                    <label>دسته بندی</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.productInputContainer}>
                    <div>
                        <label>توضیحات کالا</label>
                    </div>
                    <TextField dir="rtl" type="text"/>
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