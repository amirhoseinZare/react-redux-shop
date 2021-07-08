import { Button,CardActions ,Grid, makeStyles, Card, CardMedia, CardContent, Typography  } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
      height:130,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'relative'
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
    },
    title:{
        direction:'rtl'
    },
    button:{
        position:'absolute',
        backgroundColor:'var(--tea-green)',
        color:'var(--russian-violet)',
        bottom:'10px',
        left:'10px',
    }
  }));

function ProductCard(psops){
    const classes = useStyles();

    const {name , description, image} = psops
    return (
        <Grid item lg={4} md={6} sm={6} xs={12} xl={3}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4" component="h2" className={classes.title}>{name}</Typography>
                    <Typography className={classes.subtitle} variant="subtitle2" component="p">{description}</Typography>
                </CardContent>
                <CardMedia 
                    className={classes.cover}
                    image={`http://localhost:3001${image}`}
                    title="Live from space album cover"/>
                <Button size="small" className={classes.button}>
                اطلاعات بیشتر
                </Button>
            </Card>
        </Grid>
    )
}

export {
    ProductCard
}