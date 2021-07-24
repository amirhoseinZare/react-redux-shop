import { Grid, makeStyles, Card, CardContent, Typography  } from "@material-ui/core"
import {withRouter} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin:60,
      padding:"20px 20px 50px",
      position: 'relative',
      boxShadow:"0 0 13px 8px rgb(234, 245, 255, .7)"
    },
    img: {
        width:170,
        height:170
    },
    content:{
        textAlign:'right',
        width:'70%'
    },
    subtitle:{
        color:'var(--russian-violet)'
    },
    title:{
        color:'var(--russian-violet)'
    },
    button:{
        position: 'absolute',
        bottom:10,
        left:10,
        backgroundColor:"rgb(234, 245, 255)",
        padding:"5px 13px",
        borderRadius:"4px",
        textDecoration:'none'
    }
  }));

function ProductCardComponent(props){
    const classes = useStyles();

    const {name , price, image, url, lg=3, md=4, sm=6, xs=12, xl=3 } = props
    return (
        <Grid item lg={lg} md={md} sm={sm} xs={xs} xl={xl} onClick={()=>props.history.push(url)}>
            <Card className={classes.card}  >
                <div className={classes.img}>
                    <img style={{width:'100%'}} src={`http://localhost:3001${image}`}/>
                </div>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h2" className={classes.title}>{name}</Typography>
                    <Typography className={classes.subtitle} variant="h6" component="p">{price}</Typography>
                </CardContent>
                <a href={url} size="small" className={classes.button} onClick={e=>e.stopPropagation()}>
                اطلاعات بیشتر
                </a>
            </Card>
        </Grid>
    )
}

const ProductCard = withRouter(ProductCardComponent)
export {
    ProductCard
}