import { Paper, Grid, makeStyles, Card, CardMedia, CardContent, Typography  } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
      height:130,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    cover: {
        width: 151,
        height:'100%',

    },
    content:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        alignItems:'flex-end',
        height:130,
    },
    subtitle:{
        marginBottom:theme.spacing(7)
    }
  }));

function ProductCard(){
    const classes = useStyles();

    return (
        <Grid item lg={4} md={6} sm={6} xs={12} xl={3}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4" component="h2">
                        سوسیس
                    </Typography>
                    <Typography className={classes.subtitle} variant="subtitle2" component="p">
                        سوسیس بسیار خوشمزه برای تمام سلیقه ها
                    </Typography>
                </CardContent>
                <CardMedia 
                    className={classes.cover}
                    image="https://material-ui.com/static/images/cards/live-from-space.jpg"
                    title="Live from space album cover"/>
            </Card>
        </Grid>
    )
}

export {
    ProductCard
}