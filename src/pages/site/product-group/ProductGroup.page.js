import {Header} from "../../../layouts/index"
import {useEffect, useState} from "react"
import {Grid} from "@material-ui/core"
import axios from "axios"

function ProductsGroupPage(){

    const [groupsState, setGroupsState] = useState({ groups: [] })
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
            if(index ===groups.length-1)
                console.log(allgroups)
        })
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

export {ProductsGroupPage}