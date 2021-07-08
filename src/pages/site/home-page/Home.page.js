import { Header } from "../../../layouts/index"
import { Fragment } from "react"
import { Grid } from "@material-ui/core"
import {ProductCard} from "../../../components/index"
import {useEffect, useState} from "react"
import axios from "axios"

function HomePage(){
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
            <Grid container >
                {
                    productsState.products.map(product=>{
                        return (
                            <Fragment key={product.group.id}>
                                <Grid item xs={12}>
                                    <h1 dir="rtl">{product.group.name}</h1>
                                </Grid>
                                    {product.products.map(prod=>{
                                        const {name, description, image} = prod
                                        return (
                                            <ProductCard name={name} description={description} image={image}/>
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

export {
    HomePage
}