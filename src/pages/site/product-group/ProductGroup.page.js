import {Header} from "../../../layouts/index"
import {useEffect, useState} from "react"
import {Grid} from "@material-ui/core"
import axios from "axios"
import {withRouter} from "react-router-dom"

function ProductsGroupPageComponent(props){

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
                productsName:response.data.map(prod=>prod.name)
            })
            if(index ===groups.length-1){
                setGroupsState({groups:allgroups})
            }
        })
        console.log(props.match.params)
    }, [])

    useEffect(async ()=>{
        const response = await axios.get('http://localhost:3001/products', {params: {group:props.match.params.groupName}})
        const products = response.data
        await setProductsState({ products:products })
        console.log(productsState)
    }, [])

    return (
        <div>
            <Header/>
            <div style={{display:'flex', }}>
                <Grid item lg={8} md={10} sm ={10} xs={10}>
                    Product group page
                </Grid>
                <Grid item lg={4} md={2} sm ={2} xs={2}>
                    other
                </Grid>
            </div>
        </div>
    )
}

const ProductsGroupPage = withRouter(ProductsGroupPageComponent)
export {ProductsGroupPage}