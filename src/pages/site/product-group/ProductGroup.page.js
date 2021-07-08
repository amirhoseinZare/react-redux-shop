import {Header} from "../../../layouts/index"
import {useEffect, useState} from "react"
import {Grid , makeStyles, Typography} from "@material-ui/core"
import axios from "axios"
import {withRouter} from "react-router-dom"
import {ProductsGroupAside, ProductCard} from "../../../components/index"


const useStyles = makeStyles((theme) => ({
    asideContainer:{
        height:'100vh',
        borderLeft: '1px solid var(--lavender-floral)',
        boxSizing: 'border-box'
    },
    productGroupTitle:{
        textAlign:'right',
        marginTop:theme.spacing(7),
        marginRight:theme.spacing(3),
        color:'var(--russian-violet)'
    },
    productsContainer:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
    }
}));
 

function ProductsGroupPageComponent(props){
    const classes = useStyles();
    const [groupsState, setGroupsState] = useState({ groups: [] })
    const [productsState, setProductsState] = useState({ products: [] })

    useEffect(async ()=>{
        const allgroups = []
        const response = await axios.get('http://localhost:3001/groups')
        const groups = response.data
        groups.forEach(async (group , index)=>{
            const response = await axios.get('http://localhost:3001/products', {params: {group:group.name}})
            allgroups.push({
                group:group.name,
                groupId:group.id,
                products:response.data.map(prod=> ({name:prod.name, id:prod.id})),
            })
            if(index ===groups.length-1){
                console.log(allgroups)
                await setGroupsState({groups:allgroups})
            }
        })
    }, [])

    useEffect(async ()=>{
        const response = await axios.get('http://localhost:3001/products', {params: {group:props.match.params.groupName}})
        const products = response.data
        await setProductsState({ products:products })
    }, [])

    return (
        <div>
            <Header/>
            <div style={{display:'flex', }}>
                <Grid item lg={8} md={8} sm ={8} xs={8}>
                    <Typography variant="h4" component="h1" className={classes.productGroupTitle}>{props.match.params.groupName}</Typography>
                    <div className={classes.productsContainer}>
                    {productsState.products.map((prod, index)=>{
                        const {name, description, image, url} = prod
                        return (<ProductCard lg={6} md={12} sm ={12} xs={12} name={name} description={description} image={image}></ProductCard>)
                    })}
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm ={4} xs={4} className={classes.asideContainer}>
                    <ProductsGroupAside groups={groupsState.groups}/>
                </Grid>
            </div>
        </div>
    )
}

const ProductsGroupPage = withRouter(ProductsGroupPageComponent)
export {ProductsGroupPage}