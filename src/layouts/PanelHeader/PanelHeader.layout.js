import { useState } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Typography ,MenuItem, Menu, BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ReactComponent as ShopLogo } from "../../assets/icons/shop-logo.svg"
import { Link, withRouter } from "react-router-dom"
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
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
    fill:'#fff'
  },
  icon:{
    marginLeft:'10px',
  },
  root:{
      width:500,
  },
  container:{
      display: 'flex',
      justifyContent:'space-between',
      width: '100%',
      padding:0
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
        <MenuItem onClick={()=>props.history.push('/panel/login')}>
            <IconButton aria-label="show 4 new mails">
              <MailIcon />
            </IconButton>
            <Link to="/panel/login">
              مدیریت
            </Link>
        </MenuItem>
        <MenuItem onClick={()=>props.history.push('/panel/orders')}>
            <IconButton aria-label="show 4 new mails">
              <RestoreIcon />
            </IconButton>
            <Link to="/panel/orders">
                سفارش ها    
            </Link>
        </MenuItem>
        <MenuItem onClick={()=>props.history.push('/panel/quantity')}>
            <IconButton aria-label="show 4 new mails">
              <FavoriteIcon />
            </IconButton>
            <Link to="/panel/quantity">
            موجودی و قیمت ها
            </Link>
        </MenuItem>
        <MenuItem onClick={()=>props.history.push('/panel/products')}>
            <IconButton aria-label="show 4 new mails">
              <LocationOnIcon />
            </IconButton>
            <Link to="/panel/products">
            کالا ها 
            </Link>
        </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.container}>
            <MenuItem className={classes.title} onClick={()=>props.history.push('/panel/login')}>
                <Typography variant="p" noWrap>
                    <Link to="/panel/login">
                    مدیریت
                    </Link>
                </Typography>
                <MailIcon className={classes.icon}/>
            </MenuItem>
            <MenuItem className={classes.title}>
                <BottomNavigation
                    value={anchorEl}
                    onChange={(event, newValue) => {
                        setAnchorEl(newValue);
                    }}
                    showLabels
                    className={classes.root}
                    >
                    <BottomNavigationAction onClick={()=>props.history.push('/panel/orders')} label="سفارش ها" icon={<Link to="/panel/orders"><RestoreIcon /></Link>} />
                    <BottomNavigationAction onClick={()=>props.history.push('/panel/quantity')} label="موجودی و قیمت ها" icon={<Link to="/panel/quantity"><FavoriteIcon /></Link>} />
                    <BottomNavigationAction onClick={()=>props.history.push('/panel/products')} label="کالا ها" icon={<Link to="/panel/products"><LocationOnIcon /></Link>} />
                </BottomNavigation>
            </MenuItem>
            <div className={classes.sectionDesktop}>
                <MenuItem>
                    <Typography className={classes.name} variant="h6" onClick={()=>props.history.push('/')}>
                        <Link to="/">
                            فروشگاه فلان
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
                    <Link to="/">
                      فروشگاه فلان
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


const PanelHeader = withRouter(HeaderLayout)
export {PanelHeader}