import { filter } from "lodash";
import { useState } from "react";
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
  TextField,
} from "@mui/material";
// components
import Page from "../../components/Page";
import firebase from "../../firebase";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import {
  UserListHead
} from "../../sections/@dashboard/user";
//

import { CSVLink } from "react-csv";
import useGetExtras from "src/hooks/useGetExtras";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Full name", alignRight: false },
  { id: "department", label: "Department", alignRight: false },
  { id: "age", label: "Age", alignRight: false },
  { id: "contact", label: "Contact", alignRight: false },
  { id: "email", label: "Email", alignRight: false },

  { id: "" },
];

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
export default function Extras() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setlaoding] = useState(false);

  const [values, setValues] = useState(null);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let USERLIST = useGetExtras().docs;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.client);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const deleteItem = (id) => {
    firebase
      .firestore()
      .collection("leaders")
      .doc(id)
      .delete()
      .then(() => {
        alert("Leader was deleted successfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const createGame = () => {
    setlaoding(true);
    firebase
      .firestore()
      .collection("leaders")
      .add({
        name: values.name,
        age: values.age,
        department: values.department,
        contact: values.contact,
        email: values.email,
      })
      .then(() => {
        setlaoding(false);
        setValues({ name: "", price: 0 });
        alert("Leader added");
      });
  };
  const editExtra = (id) => {
    setlaoding(true);
    firebase
      .firestore()
      .collection("leaders")
      .doc(id)
      .update({
        name: values.name,
        age: values.age,
        department: values.department,
        contact: values.contact,
        email: values.email,
        // price : parseFloat(values.price)
      })
      .then(() => {
        setlaoding(false);
        setValues({
          name: "",
          age: "",
          department: "", 
          contact: "",
          email: "",
        });
        alert("Service added");
      });
  };

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
            Leaders
          </Typography>

          <CSVLink
            data={USERLIST}
            filename="Download_file.csv"
            style={{ textDecoration: "none" }}
          >
            {" "}
            <Button
              size="large"
              type="submit"
              variant="contained"
              style={{ textDecoration: "none" }}
            >
              Download File {USERLIST.length} Records
            </Button>
          </CSVLink>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={8} md={8}>
            <Card>
              <Scrollbar>
                <TableContainer sx={{}}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
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
                          const { id, name, age, contact, email, department } = row;
                          return (
                            <TableRow hover key={id} tabIndex={-1}>
                              <TableCell align="left">{name}</TableCell>
                              <TableCell align="left">{department}</TableCell>
                              <TableCell align="left">{age}</TableCell>
                              <TableCell align="left">{contact}</TableCell>
                              <TableCell align="left">{email}</TableCell>
                              <TableCell align="left">
                                <Button
                                  onClick={() =>
                                    setValues({
                                      name: name,
                                      id: id,
                                      age: age,
                                      contact: contact,
                                      department: department,
                                      email: email,
                                    })
                                  }
                                >
                                  View
                                </Button>
                              </TableCell>
                              <TableCell align="left">
                                <Button onClick={() => deleteItem(id)}>
                                  Delete
                                </Button>
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
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>

          <Grid item xs={4} md={4} spacing={3}>
            <Typography variant="overline">
              {values?.id ? "Edit" : "Add"} Leader
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                value={values?.name}
                onChange={handleChange("name")}
                label="name"
              />

              <TextField
                fullWidth
                value={values?.age}
                onChange={handleChange("age")}
                label="age"
              />

              <TextField
                fullWidth
                value={values?.contact}
                onChange={handleChange("contact")}
                label="contact"
              />

              <TextField
                fullWidth
                value={values?.email}
                onChange={handleChange("email")}
                label="email"
              />

<TextField
                fullWidth
                value={values?.department}
                onChange={handleChange("department")}
                label="department"
              />

              {!loading && (
                <Button
                  fullWidth={false}
                  variant="contained"
                  onClick={
                    values?.id
                      ? () => editExtra(values?.id)
                      : () => createGame()
                  }
                >
                  {values?.id ? "Update" : "Save"}
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
