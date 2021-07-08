import { Header } from "../../../layouts/index"
import { Fragment } from "react"
import { Grid, makeStyles } from "@material-ui/core"
import {ProductCard} from "../../../components/index"
import {useEffect, useState} from "react"
import axios from "axios"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { withRouter } from "react-router-dom"

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

function HomePagePage(props){
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
            <Grid container className={classes.productsContainer}>
                {
                    productsState.products.map(product=>{
                        const {name:groupName, id:groupId} = product.group
                        const groupLink = `/product/group/${groupId}/${groupName}`
                        return (
                            <Fragment key={product.group.id}>
                                <Grid item xs={12}>
                                    <h1 className={classes.groupTitle} dir="rtl" onClick={()=>{props.history.push(groupLink)}}>
                                        <a href={groupLink} className={classes.anchorGroupTitle} onClick={event=>event.stopPropagation()}>{product.group.name}</a>
                                        <ArrowLeftIcon className={classes.groupArrow}/>
                                    </h1>
                                </Grid>
                                    {product.products.map(prod=>{
                                        const {name, description, image} = prod
                                        return (
                                            <ProductCard key={prod.id} name={name} description={description} image={image} url={''}/>
                                        )
                                    })}
                            </Fragment>
                            
                        )
                    })
                }
                
            </Grid>
        </Fragment>
       
    );
}

const HomePage = withRouter(HomePagePage)

export {
    HomePage
}