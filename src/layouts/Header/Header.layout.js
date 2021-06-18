import { useState } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Typography ,MenuItem, Menu } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ReactComponent as ShopLogo } from "../../assets/icons/shop-logo.svg"
import { Link } from "react-router-dom"

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
    fill:'#fff'
  },
  icon:{
    marginLeft:'10px',
  }
}));

export default function Header() {
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
        <MenuItem >
          <Link to="/cart">
            <IconButton aria-label="show 4 new mails" >
              <MailIcon />
            </IconButton>
              <p>سبد خرید</p>
          </Link>
        </MenuItem>
        <MenuItem >
          <Link to="/cart">
            <IconButton aria-label="show 4 new mails">
              <MailIcon />
            </IconButton>
            <p>مدیریت</p>
          </Link>
        </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
            <MenuItem className={classes.title} >
              <Link to="/cart">
                <Typography variant="p" noWrap>
                سبد خرید  
                </Typography>
                <MailIcon className={classes.icon}/>
              </Link>
            </MenuItem>
            <MenuItem  className={classes.title}>
              <Link to="/cart">
                <Typography variant="p" noWrap>
                    مدیریت
                </Typography>
                <MailIcon className={classes.icon}/>
              </Link>
            </MenuItem>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem>
                <Typography className={classes.name} variant="h6" >
                    فروشگاه فلان
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography className={classes.title} variant="h6" noWrap>
                    <ShopLogo className={classes.shopLogo}/>
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
                  <Typography className={classes.name} style={{marginRight:'30px'}} variant="h6" >
                      فروشگاه فلان
                  </Typography>
                  <Typography className={classes.name} variant="h6" noWrap>
                      <ShopLogo className={classes.shopLogo}/>
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

export {Header}