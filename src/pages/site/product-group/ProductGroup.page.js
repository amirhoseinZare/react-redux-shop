import {Header} from "../../../layouts/index"
import {useEffect, useState} from "react"
import {Grid , makeStyles, Typography} from "@material-ui/core"
import {withRouter} from "react-router-dom"
import {ProductsGroupAside, ProductCard} from "../../../components/index"
import {Spinner} from "../../../components/index"
import {getGroups} from "../../../model/groups.model"
import {getProducts} from "../../../model/products.model"

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
        justifyContent:'flex-end',
    }
}));
 

function ProductsGroupPageComponent(props){
    const classes = useStyles();
    const [groupsState, setGroupsState] = useState({ groups: [] })
    const [productsState, setProductsState] = useState({ products: [] })
    const [loading, setLoading] = useState({ show: true })

    useEffect(async ()=>{
        const allgroups = []
        const response = await getGroups()
        const groups = response.data
        groups.forEach(async (group , index)=>{
            const response = await getProducts({params: {group:group.name}})
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
        const response = await getProducts({params: {group:props.match.params.groupName}})
        const products = response.data
        await setProductsState({ products:products })
        setLoading({show:false})
    }, [])

    const pageContent = (
        <div style={{display:'flex', }}>
            <Grid item lg={10} md={9} sm ={8} xs={8}>
                <Typography variant="h4" component="h1" className={classes.productGroupTitle}>{props.match.params.groupName}</Typography>
                <div className={classes.productsContainer}>
                {productsState.products.map((prod, index)=>{
                    const {name, description, image, id} = prod
                    return (<ProductCard lg={6} md={6} sm ={12} xs={12} url={`/product/${id}`} name={name} description={description} image={image}></ProductCard>)
                })}
                </div>
            </Grid>
            <Grid item lg={2} md={3} sm ={4} xs={4} className={classes.asideContainer}>
                <ProductsGroupAside groups={groupsState.groups}/>
            </Grid>
        </div>
    )

    const loadingUi = (<div style={{display: 'flex', justifyContent: 'center', paddingTop:'50px'}} >
                            <Spinner spinnerColor='var(--russian-violet)'/>
                        </div>)
    
    return (
        <div>
            <Header/>
            { loading.show ? loadingUi : pageContent }
        </div>
    )
}

const ProductsGroupPage = withRouter(ProductsGroupPageComponent)
export {ProductsGroupPage}