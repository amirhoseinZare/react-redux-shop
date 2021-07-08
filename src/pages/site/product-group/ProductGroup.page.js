import {Header} from "../../../layouts/index"
import {useEffect, useState} from "react"
import {Grid} from "@material-ui/core"
import axios from "axios"
import {withRouter} from "react-router-dom"
import {ProductsGroupAside} from "../../../components/index"

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
                <Grid item lg={8} md={10} sm ={10} xs={10}>
                    Product group page
                </Grid>
                <Grid item lg={4} md={2} sm ={2} xs={2}>
                    <ProductsGroupAside groups={groupsState.groups}/>
                </Grid>
            </div>
        </div>
    )
}

const ProductsGroupPage = withRouter(ProductsGroupPageComponent)
export {ProductsGroupPage}