import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link } from "react-router-dom"
import classes from "./PanelLogin.module.scss"

function PanelLoginPage (){
    return (
        <div>
            <Grid item lg={4} md={6} sm={6} xs={10} xl={3} className={classes.loginFormContainer}>
                <Typography variant='h6' component='h1' className={classes.loginFormHeader}>ورود به پنل مدیریت فروشگاه</Typography>
                <form>
                    <div className={classes.loginInput}>
                        <div className={classes.loginLabel}>
                            <label>نام کاربری</label>
                        </div>
                        <TextField dir="rtl" placeholder="مثال : amir" type="text"/>
                    </div>
                    <div className={classes.loginInput}>
                        <div className={classes.loginLabel}>
                            <label>رمز عبور</label>
                        </div>
                        <TextField dir="rtl" placeholder="مثال : 1234" type="password"/>
                    </div>
                    <div className={classes.login‌Button} >
                        <Button>ورود</Button>
                    </div>
                </form>
                <div className={classes.backHome}>
                    <Link to="/">بازگشت به سایت</Link>
                </div>
            </Grid>
        </div>
      );
}

export {PanelLoginPage}