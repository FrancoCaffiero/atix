import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SearchFilters from "./SearchFiltersComponent";
import SearchResults from "./SearchResultsComponent";

/* Material UI inline-styling */
const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

/* Function component for the Alarms page including the searching functionality */
/* Through the props, it gets search function and the list of results and pass them accordingly */
const Alarms = (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.title} variant="h6">
        Alarms
      </Typography>
      <Container className={classes.container}>
        <SearchFilters searchAlarms={props.searchAlarms} />
      </Container>
      <Container className={classes.container}>
        <SearchResults searchResults={props.searchResults} />
      </Container>
    </>
  );
};

export default Alarms;
