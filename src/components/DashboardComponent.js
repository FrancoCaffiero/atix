import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

/* Material UI inline-styling */
const useStyles = makeStyles((theme) => ({
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

/* Function component for the Dashboard that shows available widgets, in this case, only configured Alarms quantity */
const Dashboard = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        {/* Quantity of alarms with state ON */}
        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaper}>2/10 alerts</Paper>
        </Grid>
        {/* To be implemented */}
        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaper}></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
