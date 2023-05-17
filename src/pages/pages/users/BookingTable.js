import { filter } from 'lodash';
import { useState } from 'react';
import {Link, Link as RouterLink, } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button,
  Divider
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, } from '../../../sections/@dashboard/user';
//
import { CSVLink } from 'react-csv';
import useGetBookingByUser from 'src/hooks/useGetBookingByUser';
import GetCar from './GetCar';
import { useEffect } from 'react';
// ----------------------------------------------------------------------
const TABLE_HEAD = [

  
    { id: 'car_id', label: 'Car', alignRight: false },
    { id: 'extras', label: 'Extras', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'totalAmount', label: 'Total AMount', alignRight: false },
    { id: 'numberOfDays', label: 'Number of Days', alignRight: false },
    
    { id: '' }
  ];
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => 
    _user.make.toLowerCase().indexOf(query.toLowerCase()) !== -1
    || _user.model.toLowerCase().indexOf(query.toLowerCase()) !== -1
   || _user.plate.toLowerCase().indexOf(query.toLowerCase()) !== -1
   || _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1
   
  );  }
  return stabilizedThis.map((el) => el[0]);
}

// list of projects per client
export default function BookingTable({id}) {
   
    //let filtered = quotes.filter(item => item.status === "COMPLETE");

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
const [bookings, setbookings] = useState([])
const [selectedFilter, setselectedFilter] = useState("All")
let USERLIST = useGetBookingByUser(id).docs
  
useEffect(() => {
    setbookings(USERLIST)
}, [USERLIST])




  const selectItem = (filt) =>{
    setselectedFilter(filt)
    if(filt === "All"){
        setbookings(USERLIST)
        return
    }
    let filtered = USERLIST.filter(item => item.status === String(filt).toUpperCase());
    setbookings(filtered)
  }


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings?.map((n) => n.client);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings?.length) : 0;

  const filteredUsers = applySortFilter(bookings, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;


  return (
    <Page title="Quotes">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="overline" gutterBottom style={{flex:1}}>Bookings</Typography>
         

          <CSVLink 
          data={bookings}
          filename="Download_file.csv"
          style={{textDecoration:"none"}}
        >  <Button
          
          size="small"
          type="submit"
          variant="contained"
          style={{textDecoration:"none"}}
       
        >
          Download File {bookings?.length} Records
        </Button></CSVLink>
        </Stack>
<Divider />
<br/>
<Stack direction={"row"} spacing={3} >
    <Button variant={selectedFilter === "All" ? "contained" : "outlined"} onClick={()=>selectItem("All")}>All</Button>
    <Button variant={selectedFilter === "Pending" ? "contained" : "outlined"} onClick={()=>selectItem("Pending")}>Pending</Button> 
    <Button variant={selectedFilter === "Accepted" ? "contained" : "outlined"} onClick={()=>selectItem("Accepted")}>Accepted</Button> 
    <Button variant={selectedFilter === "Collected" ? "contained" : "outlined"} onClick={()=>selectItem("Collected")}>Car Collected</Button> 
    <Button variant={selectedFilter === "Returned" ? "contained" : "outlined"} onClick={()=>selectItem("Returned")}>Car Returned</Button> 
    <Button variant={selectedFilter === "Complete" ? "contained" : "outlined"} onClick={()=>selectItem("Complete")}>Complete</Button>
</Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={bookings?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, car_id, extras,status, totalAmount, numberOfDays } = row;                                           return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                        >
                          <TableCell align="left"><GetCar data={car_id} /></TableCell>
                          <TableCell align="left">{extras}</TableCell>
                          <TableCell align="left">{status}</TableCell>   
                          <TableCell align="left">{totalAmount}</TableCell>   
                          <TableCell align="left">{numberOfDays}</TableCell>   
                        
                          <TableCell align="left"> <Link  to={"/viewBooking/"+id}
            state={{data:row}}
             style={{ display: 'grid', color:"inherit", textDecoration:"none", justifyContent:"center",  }}>View</Link></TableCell>   
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={bookings?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
