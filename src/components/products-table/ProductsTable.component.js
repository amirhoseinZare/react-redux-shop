import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import { Link } from "react-router-dom"
import {Pagination, PaginationItem} from '@material-ui/lab';
import productApi from "../../model/products.model"

const useStyles = makeStyles({
    container:{
        margin:'20px auto 0',
        height:600,
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tableHeading:{
        backgroundColor:'var(--light-face)'
    },
    tableRow1:{
        backgroundColor:'#cfba93'
    },
    tableRow2:{
        backgroundColor:'var(--light-face)'
    },
    table: {
        minWidth: 650,
    },
    editDeleteButton:{
        backgroundColor:'transparent',
        border:'none',
        color:'#463197',
        textDecoration:'underline'
    }
});

export default function ProductsTable(props) {
    const classes = useStyles();
    const [productsState, setProductsState] = useState([])
    const [pageState, setPageState] = useState({perpage:5,page:1})
    const [pagesCountState, setPagesCount] = useState(null)

    const handleChange = async (event, newPage) => {
        await setPageState({...pageState,page:newPage})
    };

    useEffect( async ()=>{
        try {
            const { page, perpage } = pageState
            const response = await productApi.gets({params:{_page:page, _limit:5}})

            await setProductsState(response.data)

            const productsCount = response.headers['x-total-count']
            const pagesCount = Math.ceil( productsCount / perpage )
            setPagesCount(pagesCount)
            
        } catch (error) {
            console.log(error)            
        }
    }, [])

    useEffect( async ()=>{
        const { page } = pageState
        const response = await productApi.gets({params:{_page:page, _limit:5}})
        setProductsState(response.data)
    }, [pageState])

    useEffect( async ()=>{
       if(props.mode === 'default'){
        const { page } = pageState
        const response = await productApi.gets({params:{_page:page, _limit:5}})
        setProductsState(response.data)
       }
    }, [props.mode])

    const {openModalEditButtonHandler,openModalDeleteButtonHandler} = props
    return (
    <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.tableHeading}>
                    <TableRow>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">دسته بندی</TableCell>
                        <TableCell align="right">نام کالا</TableCell>
                        <TableCell align="right">تصویر</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productsState.map((row, index) => {
                        const { id, headgroup, group, name, image, description } = row
                        return (
                            <TableRow className={index%2===0? classes.tableRow1 : classes.tableRow2} key={id}>
                                <TableCell align="right" component="th" scope="row">
                                    <button className={classes.editDeleteButton} onClick={(row)=>openModalEditButtonHandler({ id, headgroup, group, name, image, description })}>ویرایش</button>
                                    <button className={classes.editDeleteButton} onClick={(row)=>openModalDeleteButtonHandler({ id, headgroup, group, name, image, description })}>حذف</button>
                                </TableCell>
                                <TableCell align="right">{`${headgroup}/${group}`}</TableCell>
                                <TableCell align="right">{name}</TableCell>
                                <TableCell style={{display:'flex'}} align="right" component="th" scope="row">
                                    <div style={{width: '100px', height:'50px', overflow: 'hidden'}}><img style={{width:"100%"}} src={`http://localhost:3001${image}`}/></div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <Pagination 
            hidePrevButton 
            hideNextButton 
            showFirstButton 
            showLastButton 
            count={pagesCountState} 
            page={pageState.page} 
            onChange={handleChange}
            renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`?page=${item.page}`}
                  {...item}
                />
            )}
        />
    </Grid>
    
  );
}

export {ProductsTable}