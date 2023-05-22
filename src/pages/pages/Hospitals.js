import { filter } from "lodash";
import { useEffect, useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
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
  Grid,
  Divider,
} from "@mui/material";
// components
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
// import SearchNotFound from "../../components/SearchNotFound";
import {
  UserListHead,
} from "../../sections/@dashboard/user";
//

import useGetHospitals from "src/hooks/useGetHospitals";
import { CSVLink } from "react-csv";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "title", alignRight: false },
  { id: "description", label: "description", alignRight: false },
  { id: "GroupNumber", label: "Group Number", alignRight: false },
  { id: "img", label: "img", alignRight: false },
  { id: "status", label: "status", alignRight: false },

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
        _user.make.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.model.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.plate.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// list of projects per client
export default function Hospitals() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  // const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let USERLIST = useGetHospitals().docs;
  const [bookings, setbookings] = useState([]);
  // const [selectedFilter, setselectedFilter] = useState("All");

  useEffect(() => {
    setbookings(USERLIST);
  }, [USERLIST]);

  // const selectItem = (filt) => {
  //   setselectedFilter(filt);
  //   if (filt === "All") {
  //     setbookings(USERLIST);
  //     return;
  //   }
  //   let filtered = USERLIST.filter(
  //     (item) => item.status === String(filt).toUpperCase()
  //   );
  //   setbookings(filtered);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings.map((n) => n.client);
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

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings?.length) : 0;

  const filteredUsers = applySortFilter(
    bookings,
    getComparator(order, orderBy),
    // filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Quotes">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom style={{ flex: 1 }}>
            Groups
          </Typography>

          <Button
            size="small"
            variant="contained"
            style={{ textDecoration: "none", marginRight: 20 }}
          >
            <Link
              component={RouterLink}
              style={{ textDecoration: "none" }}
              variant="subtitle2"
              to="/addHospital"
            >
              Add Group
            </Link>
          </Button>

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
          <Typography variant="overline">Overall</Typography>
          <Card sx={{ p: 3 }}>
            <Stack
              spacing={3}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <div>
                <Typography variant="overline">Total Online</Typography>
                <Typography variant="h5">
                  {USERLIST &&
                    USERLIST.filter((item) => item.status === "ONLINE").length}
                </Typography>
              </div>
              <div>
                <Typography variant="overline">Total Offline</Typography>
                <Typography variant="h5">
                  {USERLIST &&
                    USERLIST.filter((item) => item.status === "OFFLINE").length}
                </Typography>
              </div>
              <div>
                <Typography variant="overline">Total Pending</Typography>
                <Typography variant="h5">
                  {USERLIST &&
                    USERLIST.filter((item) => item.status === "PENDING").length}
                </Typography>
              </div>
              <div>
                <Typography variant="overline">Total Groups</Typography>
                <Typography variant="h5">
                  {USERLIST && USERLIST.length}
                </Typography>
              </div>
            </Stack>
          </Card>
        </Grid>

        <Divider />
        <br />
        
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
                      return (
                        <TableRow hover key={row.id} tabIndex={-1}>
                          {/* <TableCell padding="checkbox">
                        
                          </TableCell> */}

                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{row.GroupNumber}</TableCell>
                          <TableCell align="left"><img src={row.img} alt={row.img} style={{width : "8vh"}}/></TableCell>
                          <TableCell align="left">{row.status}</TableCell>

                          <TableCell align="left">
                            {" "}
                            <Link
                              to={"/editHospital/" + row.id}
                              state={{ id: row.id }}
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
                        {/* <SearchNotFound searchQuery={filterName} /> */}
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
