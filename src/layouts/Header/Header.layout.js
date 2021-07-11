import { useState,useEffect } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Typography ,MenuItem, Menu } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ReactComponent as ShopLogo } from "../../assets/icons/shop-logo.svg"
import { Link, withRouter } from "react-router-dom"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {connect} from "react-redux"
import {removeFromCart} from "../../redux/actions/user.action"

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems:'center',
      justifyContent:'space-between'
    },
  },
  name: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  shopLogo:{
    width:40,
    fill:'#fff',
    fill:'var(--light-cyan)',
  },
  icon:{
    marginLeft:'10px',
    fill:'var(--light-cyan)'
  },
  toolBar:{
    backgroundColor:'var(--russian-violet)'
  },
  menuAnchors:{
    color:'var(--light-cyan)',
    fill:'var(--light-cyan)',
    textDecoration:'none'
  },
  cartNumber:{
    background:'var(--light-cyan)',
    color:'var(--russian-violet)',
    position:'absolute',
    top:'0px',
    width:'18px',
    height:'18px',
    borderRadius:'50%',
    textAlign:'center',
    left:'1px',
    lineHeight:'22px'
  }
}));

export default function HeaderLayout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        <MenuItem onClick={()=>props.history.push('/cart')}>
            <IconButton aria-label="show 4 new mails" >
              <ShoppingCartIcon />
            </IconButton>
            <Link to="/panel/login" className={classes.menuAnchors} onClick={(event)=>event.stopPropagation()}>
              سبد خرید
            </Link>
        </MenuItem>
        <MenuItem onClick={()=>props.history.push('/panel/login')}>
            <IconButton aria-label="show 4 new mails">
              <AccountCircleIcon />
            </IconButton>
            <Link to="/panel/login" className={classes.menuAnchors} onClick={(event)=>event.stopPropagation()}>
              مدیریت
            </Link>
        </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.toolBar}>
        <Toolbar>
            <MenuItem className={classes.title} onClick={()=>props.history.push('/cart')} style={{position: 'relative'}}>
              <Typography component='div' variant="p" noWrap >
                <Link to="/cart" className={classes.menuAnchors} onClick={(event)=>event.stopPropagation()}>
                  سبد خرید
                </Link>
                <div className={classes.cartNumber} >{props.userCart.reduce((acc,cv)=>acc+cv.count, 0)}</div>
              </Typography>
              <ShoppingCartIcon className={classes.icon}/>
            </MenuItem>
            <MenuItem className={classes.title} onClick={()=>props.history.push('/panel/login')}>
                <Typography variant="p" noWrap>
                  <Link to="/panel/login" className={classes.menuAnchors} onClick={(event)=>event.stopPropagation()}>
                    مدیریت
                  </Link>
                </Typography>
                <AccountCircleIcon className={classes.icon}/>
            </MenuItem>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem>
                <Typography className={classes.name} variant="h6" onClick={()=>props.history.push('/')}>
                  <Link to="/" className={classes.menuAnchors} onClick={(event)=>event.stopPropagation()}>
                    فروشگاه فلان
                  </Link>
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography className={classes.title} variant="h6" noWrap onClick={()=>props.history.push('/')}>
                  <Link to="/" className={classes.menuAnchors} onClick={(event)=>event.stopPropagation()}>
                    <ShopLogo className={classes.shopLogo}/>
                  </Link>
                </Typography>
            </MenuItem>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
              <MenuItem>
                  <Typography className={classes.name} style={{marginRight:'30px'}} variant="h6" onClick={()=>props.history.push('/')}>
                    <Link to="/" className={classes.menuAnchors} onClick={(event)=>event.stopPropagation()}>
                      فروشگاه فلان
                    </Link>
                  </Typography>
                  <Typography className={classes.name} variant="h6" noWrap onClick={()=>props.history.push('/')} onClick={(event)=>event.stopPropagation()}>
                    <Link to="/" className={classes.menuAnchors} onClick={(event)=>event.stopPropagation()}>
                      <ShopLogo className={classes.shopLogo}/>
                    </Link>
                  </Typography>
              </MenuItem>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps = ({user:{cart}}) => ({userCart:cart})
const mapDispatchToProps = (dispatch) => ({removeFromCart:product => dispatch(removeFromCart(product))})

const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderLayout))
export {Header}