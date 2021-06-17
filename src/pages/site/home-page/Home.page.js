import { Header } from "../../../layouts/index"
import { Fragment } from "react"
import { Grid } from "@material-ui/core"
import {ProductCard} from "../../../components/index"

function HomePage(){
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