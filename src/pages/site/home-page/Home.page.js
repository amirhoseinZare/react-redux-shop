import { Header } from "../../../layouts/index"
import { Fragment } from "react"
import { Grid, makeStyles } from "@material-ui/core"
import {ProductCard} from "../../../components/index"
import {useEffect, useState} from "react"
import axios from "axios"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const useStyles = makeStyles((theme) => ({
    groupTitle:{
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
        cursor:'pointer',
        textDecoration:'underline',
        display:'flex',
        alignItems: 'center',
    },
    anchorGroupTitle:{
        color:"#000"
    },
    productsContainer:{
        width:'100%',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    groupArrow:{
        width:'40px',
        height:'40px'
    }
}));

function HomePage(){
    const classes = useStyles();

    const [ productsState, setProductsState ] = useState({products:[]})
    // const [ groupsState, setGroupsState  ] = useState({groups:[]})
    useEffect(async()=>{
        const response = await axios.get('http://localhost:3001/groups')
        const groups = response.data
        const productsGroup = []
        groups.forEach(async (group, index) => {
            const response = await axios.get('http://localhost:3001/products', {params: {group:group.name}})
            const  products = response.data
            if(products.length>0){
                productsGroup.push({
                    group: group,
                    products:products
                })
            }
            if(index === groups.length-1){
                await setProductsState({products:productsGroup})
                console.log(productsState)
            }
        })
        
    }, [])

    return (
        <Fragment>
            <Header/>
            <Grid container>
                {
                    productsState.products.map(product=>{
                        return (
                            <Fragment key={product.group.id}>
                                <Grid item xs={12}>
                                    <h1 className={classes.groupTitle} dir="rtl">
                                        <a href='#' className={classes.anchorGroupTitle}>{product.group.name}</a>
                                        <ArrowLeftIcon className={classes.groupArrow}/>
                                    </h1>
                                </Grid>
                                <div className={classes.productsContainer}>
                                    {product.products.map(prod=>{
                                        const {name, description, image} = prod
                                        return (
                                            <ProductCard key={prod.id} name={name} description={description} image={image}/>
                                        )
                                    })}
                                </div>
                                    
                            </Fragment>
                            
                        )
                    })
                }
                
            </Grid>
        </Fragment>
       
    );
}

export {
    HomePage
}