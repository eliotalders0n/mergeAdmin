import { filter } from "lodash";
import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
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
  Divider,
  Grid,
} from "@mui/material";
// components
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { UserListHead } from "../../sections/@dashboard/user";
//

import { CSVLink } from "react-csv";
import useGetUsers from "src/hooks/useGetUsers";
import { RegisterForm } from "../../sections/authentication/register";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import useGetHospital from "src/hooks/useGetHospital";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Full name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "" },
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
  return order === "desc"
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
    return filter(
      array,
      (_user) =>
        _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.region.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.district.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.merch.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// list of projects per client
export default function Users() {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let USERLIST = useGetUsers().docs;

  const [bookings, setbookings] = useState([]);
  const [selectedFilter, setselectedFilter] = useState("All");

  useEffect(() => {
    setbookings(USERLIST);
  }, [USERLIST]);

  const selectItem = (filt) => {
    setselectedFilter(filt);
    if (filt === "All") {
      setbookings(USERLIST);
      return;
    }
    let filtered = USERLIST.filter(
      (item) => item.status === String(filt).toUpperCase()
    );
    setbookings(filtered);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings?.length) : 0;

  const filteredUsers = applySortFilter(
    bookings,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Quotes">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom style={{ flex: 1 }}>
            Users
          </Typography>

          <CSVLink
            data={bookings}
            filename="Download_file.csv"
            style={{ textDecoration: "none" }}
          >
            {" "}
            <Button
              size="small"
              type="submit"
              variant="contained"
              style={{ textDecoration: "none" }}
            >
              Download File {bookings?.length} Records
            </Button>
          </CSVLink>
        </Stack>
        <Grid item xs={12} md={12}>
          <Typography variant="overline">Users Overall</Typography>
        </Grid>

        <Divider />
        <br />
        <Stack direction={"row"} spacing={3}>
          <Button
            variant={selectedFilter === "All" ? "contained" : "outlined"}
            onClick={() => selectItem("All")}
          >
            All
          </Button>
        </Stack>

        <Grid container>
          <Grid item xs={8} md={8}>
            {" "}
            <Card>
              <Scrollbar>
                <TableContainer sx={{}}>
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
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const { id, firstName, lastName, email, address } = row;
                          return (
                            <TableRow hover key={id} tabIndex={-1}>
                              <TableCell align="left">
                                {firstName} {lastName}
                              </TableCell>
                              <TableCell align="left">{email}</TableCell>
                              <TableCell align="left">{address}</TableCell>
                              <TableCell align="left">
                                {" "}
                                <Link
                                  to={"/viewUser/" + id}
                                  state={{ data: row }}
                                  style={{
                                    display: "grid",
                                    color: "inherit",
                                    textDecoration: "none",
                                    justifyContent: "center",
                                  }}
                                >
                                  View
                                </Link>
                              </TableCell>
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
          </Grid>
          <Grid item xs={4} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Add New User
              </Typography>
              <Stack spacing={3}>
                <RegisterForm />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
