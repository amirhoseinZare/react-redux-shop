import {makeStyles} from '@material-ui/core'
import {withRouter} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
   container: {
       display: 'flex',
       flexDirection: 'column',
       alignItems:'flex-end'
   },
   groupTitle:{
       marginTop:theme.spacing(7),
       marginBottom:theme.spacing(3),
       textAlign:'right',
       color:'var(--russian-violet)'
   },
   groupCategory:{
       width:'80%',
       paddingRight:theme.spacing(3),
       color:'var(--russian-violet)',
   },
   subGroupTitle:{
    textAlign:'right',
    marginBottom:theme.spacing(1),
    color:'var(--lavender-floral)'
   },
   groupTitleLink:{
    color:'var(--lavender-floral)',
    textDecoration:'none'
   },
   groupCategoryLink:{
       textDecoration:'none'
   }
}));

function ProductsGroupAsideComponent(props){
    const classes = useStyles();

    return (
        <section className={classes.container}>
            {
                props.groups.map(group=>{
                    const {groupId:id, products, group:name} = group
                    return <article className={classes.groupCategory} key={id}>
                        <h4 className={classes.groupTitle}><a className={classes.groupCategoryLink} href={`/product/group/${id}/${name.trim().replaceAll(' ', '-')}`}>{name}</a></h4>
                        {products.map(prod=>{
                            const {name, id:prodId} = prod
                            return (<p className={classes.subGroupTitle} key={prodId}>
                                <a className={classes.groupTitleLink} href={`/product/${prodId}`}>{name}</a>
                            </p>)
                        })}
                    </article>
                })
            }
        </section>
    )
}
const ProductsGroupAside = withRouter(ProductsGroupAsideComponent)
export {
    ProductsGroupAside
}