import { Header } from "../../../layouts/index"
import { Fragment } from "react"
import { Grid, makeStyles } from "@material-ui/core"
import {ProductCard} from "../../../components/index"
import {useEffect, useState} from "react"
import product from "../../../model/products.model"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { withRouter } from "react-router-dom"
import {Spinner} from "../../../components/index"
import groupApi from "../../../model/groups.model"

const useStyles = makeStyles((theme) => ({
    groupTitle:{
        display:'inline-block',
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
        cursor:'pointer',
        display:'flex',
        alignItems: 'center',
    },
    anchorGroupTitle:{
        color:"var(--russian-violet)",
        textDecoration:'none'
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
    const [loading, setLoading] = useState({show:true});
    const [ productsState, setProductsState ] = useState({products:[]})
    useEffect(async()=>{
        const response = await groupApi.gets()
        const groups = response.data
        Promise.all(groups.map((group, index) => product.gets({params: {group:group.name, _limit:6}}))).then(async (responses)=>{
            const productsGroup = responses.map( (res,i)=> ({group:groups[i], products:res.data}))
            await setLoading({show:false})
            setProductsState({products:productsGroup})

        })
    }, [])

    const pageContent = (<Grid container className={classes.productsContainer}>
        {
            productsState.products.map(product=>{
                const {name:groupName, id:groupId} = product.group
                const groupLink = `/product/group/${groupId}/${groupName}`
                return (
                    <Fragment key={product.group.id}>
                        <Grid style={{display: 'flex', justifyContent: 'flex-end'}} item xs={12}>
                            <h2 className={classes.groupTitle} dir="rtl" onClick={()=>{props.history.push(groupLink)}}>
                                <a href={groupLink} className={classes.anchorGroupTitle} onClick={event=>event.stopPropagation()}>{product.group.name}</a>
                                <ArrowLeftIcon className={classes.groupArrow}/>
                            </h2>
                        </Grid>
                            {product.products.map(prod=>{
                                const {name,  image, id, price} = prod
                                return (
                                    <ProductCard key={prod.id} name={name} price={price} image={image} url={`/product/${id}`}/>
                                )
                            })}
                    </Fragment>
                    
                )
            })
        }
        
    </Grid>)

    const loadingUi = (<div style={{display: 'flex', justifyContent: 'center', paddingTop:'50px'}} >
                            <Spinner spinnerColor='var(--russian-violet)'/>
                        </div>)

    return (
        <Fragment>
            <Header/>
            { loading.show ? loadingUi : pageContent }
        </Fragment>
       
    );
}

const HomePage = withRouter(HomePagePage)

export {
    HomePage
}