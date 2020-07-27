import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
    alignItems: "center",
    justifyContent: "center",
  },
  fixedHeight: {
    height: 240,
  },
}));

/* Function component for the Dashboard that shows available widgets, in this case, only configured Alarms quantity */
const Dashboard = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        {/* Quantity of alarms with state ON */}
        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaper}>
            <Typography variant="h5">
              {props.nActiveAlarms} / {props.nTotalAlarms} Alarms Turned ON
            </Typography>
          </Paper>
        </Grid>
        {/* Another widget to be implemented in future sprints */}
        {/*
        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaper}></Paper>
        </Grid>
        */}
      </Grid>
    </Container>
  );
};

export default Dashboard;
