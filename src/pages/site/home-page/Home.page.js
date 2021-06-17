import { Header } from "../../../layouts/index"
import { Fragment } from "react"
import { Container, Paper, Grid, makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
      height:130,
    },
  }));

function HomePage(){
    const classes = useStyles();

    return (
        <Fragment>
            <Header/>
            <Grid container >

                <Grid item xs={12}>
                    <h1 dir="rtl">کالا های گروه فلان</h1>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                
                <Grid item xs={12}>
                    <h1 dir="rtl">کالا های گروه فلان</h1>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>


            </Grid>
        </Fragment>
       
    );
}

export {
    HomePage
}