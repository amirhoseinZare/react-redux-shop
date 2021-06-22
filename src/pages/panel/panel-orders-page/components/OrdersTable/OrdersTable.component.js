import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import classes from "./OrdersTable.module.scss"

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
  
  function createData(id,  username, allPrice, date) {
    return { id, imageUrl:"https://fil-idf.org/wp-content/uploads/2021/01/Standards.png", username, allPrice, date };
  }
  
const rows = [
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
    createData(12,'امیرحسین زارع', 5600, 5623985632856283),
];
  
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function OrdersTable() {
    return (
        <Grid lg={8} xl={10} md={8} sm={8} xs={11} className={classes.ordersContainer}>
            <TableContainer component={Paper} className={classes.ordersTable}>
                <Table  aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">نام کاربر</StyledTableCell>
                        <StyledTableCell align="right">مجموع مبلغ</StyledTableCell>
                        <StyledTableCell align="right">سفارش ها</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id} align="right">
                        <StyledTableCell component="th" scope="row" align="right">{row.username}</StyledTableCell>
                        <StyledTableCell align="right">{row.allPrice}</StyledTableCell>
                        <StyledTableCell align="right">{new Date(row.date).toLocaleString('fa-IR')}</StyledTableCell>
                        <StyledTableCell align="right"><a href="#">حذف</a> <a href="#">ویرایش</a></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export {
    OrdersTable
}