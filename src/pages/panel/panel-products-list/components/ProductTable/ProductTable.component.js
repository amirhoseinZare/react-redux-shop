import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"
import { DataGrid } from '@material-ui/data-grid';
import styles from './ProducsTable.module.scss'

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

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];

function createData(id,  name, category) {
  return { id, imageUrl:"https://fil-idf.org/wp-content/uploads/2021/01/Standards.png", name, category };
}

const rows = [
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
  createData(19,'شیر', 'لبنیات'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ProductsTable() {
  const classes = useStyles();
    console.log(rows)
  return (
    <Grid lg={10}  className={styles.productsContainer}>
        <TableContainer component={Paper} className={styles.productsTable}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell align="right">تصویر</StyledTableCell>
                <StyledTableCell align="right">نام کالا</StyledTableCell>
                <StyledTableCell align="right">دسته بندی</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.id} align="right">
                <StyledTableCell component="th" scope="row" align="right">
                    <img width="70px" height="70px" style={{borderRadius:'50%'}} src="https://fil-idf.org/wp-content/uploads/2021/01/Standards.png"/>
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.category}</StyledTableCell>
                <StyledTableCell align="right"><a href="#">حذف</a> <a href="#">ویرایش</a></StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Grid>
  );
}

export { ProductsTable }