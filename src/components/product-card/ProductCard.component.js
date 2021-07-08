import { Button,CardActions ,Grid, makeStyles, Card, CardMedia, CardContent, Typography  } from "@material-ui/core"
import {withRouter} from "react-router-dom"

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
      position: 'relative',
      boxShadow:'0 0 20px 5px rgba(162, 136, 227,.5)',
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
        height:130
    },
    subtitle:{
        marginBottom:theme.spacing(7),
        wordWrap:'break !important',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width:'300px',
        textAlign:'right',
        direction:'rtl',
    },
    title:{
        direction:'rtl'
    },
    button:{
        position:'absolute',
        backgroundColor:'var(--beau-blue)',
        color:'var(--russian-violet)',
        bottom:'10px',
        left:'10px',
        width:'125px',
        height:'40px',
        lineHeight:'36px',
        textDecoration:'none',
        borderRadius:'4px',
        border:'2px solid var(--russian-violet)',
        boxSizing:'border-box',
    }
  }));

function ProductCardComponent(props){
    const classes = useStyles();

    const {name , description, image, url, lg=4, md=6, sm=6, xs=12, xl=3 } = props
    return (
        <Grid item lg={lg} md={md} sm={sm} xs={xs} xl={xl} onClick={()=>props.history.push(url)}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4" component="h2" className={classes.title}>{name}</Typography>
                    <Typography className={classes.subtitle} variant="subtitle2" component="p">{description}</Typography>
                </CardContent>
                <CardMedia 
                    className={classes.cover}
                    image={`http://localhost:3001${image}`}
                    title="Live from space album cover"/>
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