import { Header } from "../../../layouts/index"
import { Fragment } from "react"
import { Grid } from "@material-ui/core"
import {ProductCard} from "../../../components/index"
import {useState, useEffect} from "react"
import axios from "axios"

function HomePage(){

    const [groupsState, setGroupsState] = useState({groups:[]})
    const [productsState, setProducts] = useState([{}])

    useEffect( async ()=>{
        const groups = await axios.get('http://localhost:3001/groups')
        const groupsData = groups.data
        console.log(groupsData)
        setGroupsState({groups:groupsData})
        
    }, [])

    useEffect( async ()=>{
        const products = []
        console.log(groupsState)
        groupsState.groups.forEach( async ( group, index )=>{
            const response = await axios.get('http://localhost:3001/products', {params:{group:group.name}})
            console.log(response.data)
            products.push({products:[...response.data],group:group.name})
            console.log(products)
            if(index===groupsState.groups.length-1){
                setProducts(products)
            }
        })
    }, [groupsState])

    useEffect( async ()=>{
       console.log(productsState)
    }, [productsState])

    return (
        <Fragment>
            <Header/>
            <Grid container >

                <Grid item xs={12}>
                    <h1 dir="rtl">کالا های گروه فلان</h1>
                </Grid>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <Grid item xs={12}>
                    <h1 dir="rtl">کالا های گروه فلان</h1>
                </Grid>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </Grid>
        </Fragment>
       
    );
}

export {
    HomePage
}