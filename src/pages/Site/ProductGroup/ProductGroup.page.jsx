import {Header} from "../../../layouts/index"
import {useEffect, useState} from "react"
import {Grid , makeStyles, Typography} from "@material-ui/core"
import {withRouter} from "react-router-dom"
import {ProductsGroupAside, ProductCard} from "../../../components/index"
import {WithSpinner} from "../../../components/index"
import groupApi from "../../../api/groups.api"
import productApi from "../../../api/products.api"
import {e2p} from "../../../utils/LanGuaggeNumberConvertor.utils"
import {numberWithCommas} from "../../../utils/numberWithCommas.utils"

const useStyles = makeStyles((theme) => ({
    asideContainer:{
        height:'100vh',
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
    },
    mainContent:{
        borderRight: '1px solid var(--lavender-floral)',
    }
}));
 

function ProductsGroupPageComponent(props){
    const classes = useStyles();
    const [groupsState, setGroupsState] = useState({ groups: [] })
    const [productsState, setProductsState] = useState({ products: [] })
    const [loading, setLoading] = useState({ show: true })

    useEffect( ()=>{
        const getGroupsAndProducts = async () => {
            const allgroups = []
            const response = await groupApi.gets()
            const groups = response.data
            groups.forEach(async (group , index)=>{
                const response = await productApi.gets({params: {group:group.name}})
                allgroups.push({
                    group:group.name,
                    groupId:group.id,
                    products:response.data.map(prod=> ({name:prod.name, id:prod.id})),
                })
                if(index ===groups.length-1){
                    await setGroupsState({groups:allgroups})
                }
            })
        }
        getGroupsAndProducts()
    }, [])

    useEffect(async ()=>{
        const getProductByGroupName = async () =>{
            const response = await productApi.gets({params: {group:props.match.params.groupName.replaceAll('-', ' ')}})
            const products = response.data
            await setProductsState({ products:products })
            setLoading({show:false})    
        }
        getProductByGroupName()
    }, [])

    const pageContent = (
        <div style={{display:'flex', }}>
            <Grid item lg={10} md={9} sm ={8} xs={8} className={classes.mainContent}>
                <Typography variant="h4" component="h1" className={classes.productGroupTitle}>{props.match.params.groupName.replaceAll('-', ' ')}</Typography>
                <div className={classes.productsContainer}>
                {productsState.products.map((prod, index)=>{
                    const {name, image, id, price} = prod
                    return (<ProductCard lg={4} md={6} sm ={12} xs={12} url={`/product/${id}`} name={name} price={e2p(numberWithCommas(price))} image={image}></ProductCard>)
                })}
                </div>
            </Grid>
            <Grid item lg={2} md={3} sm ={4} xs={4} className={classes.asideContainer}>
                <ProductsGroupAside groups={groupsState.groups}/>
            </Grid>
        </div>
    )
    
    return (
        <div>
            <Header/>
            <WithSpinner isLoading={loading.show} content={pageContent} />
        </div>
    )
}

const ProductsGroupPage = withRouter(ProductsGroupPageComponent)
export {ProductsGroupPage}