import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

/* Example data */
const rows = [
  {
    name: "MyAlarm",
    source: "Sever 1",
    metric: "CPU Usg",
    trigger: ">80%",
    paused: "true",
  },
];

/* Search results table columns setting */
const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 120,
  },
  {
    id: "source",
    label: "Source",
    minWidth: 80,
  },
  {
    id: "metric",
    label: "Metric",
    minWidth: 80,
  },
  {
    id: "trigger",
    label: "Trigger",
    minWidth: 40,
  },
  {
    id: "paused",
    label: "Paused",
    minWidth: 20,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 140,
    align: "center",
  },
];

/* Material UI inline-styling */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 380,
  },
  actionButton: {
    margin: theme.spacing(1),
  },
}));

/* Function component for the results table with paginator using React Hooks */
function SearchResults() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  /* Changes the current results table page */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /* Changes the quantity of results table rows shown  */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      if (column.id === "actions") {
                        return (
                          <TableCell align="center" justify="center">
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.actionButton}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.actionButton}
                            >
                              Delete
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.actionButton}
                            >
                              Resume
                            </Button>
                          </TableCell>
                        );
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default SearchResults;
