import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Dashboard from "./DashboardComponent";
import Alarms from "./AlarmsComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { menuBarItems } from "./listItems";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { baseUrl } from "../shared/baseUrl";

/* Material UI inline-styling */
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.primary.light,
  },
  toolbar: {
    width: "100%",
    justifyContent: "flex-end",
  },
  appBarSpacer: theme.mixins.toolbar,
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
  },

  drawerPaper: {
    background: theme.palette.primary.light,
    position: "relative",
    paddingTop: 64,
  },

  content: {
    background: "#e0e0e0",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },

  menuItemIcon: {
    justifyContent: "center",
  },

  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function Main() {
  /* Material UI inline-styling */
  const classes = useStyles();

  /* Fetching the alarms from the REST API Server and updating the state of the Alarms */
  const [alarms, setAlarms] = React.useState([]);
  React.useEffect(() => {
    fetch(baseUrl + "alarms")
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((alarms) => setAlarms(alarms))
      .catch((error) => {
        throw error;
      });
  }, []);

  /* Delete alarm function, fetching the REST API */
  const deleteAlarm = (id) => {
    fetch(baseUrl + "alarms/" + id, { method: "DELETE" })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then(removeAlertFromList(id))
      .catch((error) => {
        throw error;
      });
  };

  /* Removes the item from both the main Alarms list and the Search Results shown on screen */
  const removeAlertFromList = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
    setSearchResults(searchResults.filter((alarm) => alarm.id !== id));
  };

  /* Resume or pause alarm function, fetching the REST API */
  const resumeOrPauseAlarm = (id) => {
    fetch(baseUrl + "alarms/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alarms.filter((a) => a.id === id)),
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then(resumeOrPauseAlarmInArrays(id))
      .catch((error) => {
        throw error;
      });
  };

  /* Depending the current state of the alarm, it resumes or pauses the alarm */
  const resumeOrPauseAlarmInArrays = (id) => {
    /* Getting the index of the alert in the arrays  */
    const alarmId = alarms
      .map((alarm) => {
        return alarm.id;
      })
      .indexOf(id);
    const alarmResultId = searchResults
      .map((alarm) => {
        return alarm.id;
      })
      .indexOf(id);
    /* New Arrays from the copy of the actual ones */
    let newAlarms = [...alarms];
    let newSearchResults = [...searchResults];
    /* New value of the field */
    const newValue = !newAlarms[alarmId].paused;
    /* Accesing to the alert by the obtained Index in each array*/
    newAlarms[alarmId].paused = newValue;
    newSearchResults[alarmResultId].paused = newValue;
    /* Updating the states with the new arrays */
    setAlarms(newAlarms);
    setSearchResults(newSearchResults);
  };

  /* Search functionality */
  const [searchResults, setSearchResults] = React.useState([]);
  const searchAlarms = (name, status) => {
    const results = alarms.filter(
      (alarm) =>
        alarm.name.toLowerCase().includes(name) &&
        (status === "Paused"
          ? alarm.paused
          : status === "Running"
          ? !alarm.paused
          : alarm.paused || !alarm.paused)
    );
    setSearchResults(results);
  };

  /* Counter of active alarms non paused */
  const [amountActiveAlarms, setAmountActiveAlarms] = React.useState(0);
  React.useEffect(() => {
    setAmountActiveAlarms(alarms.filter((a) => !a.paused).length); //Lambda expression to count the amount of alarms with paused = false
  }, [alarms]);

  return (
    <div className={classes.root}>
      {/* Material UI style-normalizations */}
      <CssBaseline />

      {/* Fixed Top Bar with Notification Badge */}
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" className={classes.toolbarIcon}>
            <Badge badgeContent={amountActiveAlarms} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Navigation Bar / Menu */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List classes={{ ListItemIcon: classes.menuItemIcon }}>
          {menuBarItems}
        </List>
        <Divider />
      </Drawer>

      {/* Content of the selected menu option, by default it redirects to Dashboard */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route
            path="/dashboard"
            component={() => (
              <Dashboard
                nActiveAlarms={amountActiveAlarms}
                nTotalAlarms={alarms.length}
              />
            )}
          />
          <Route
            path="/alarms"
            component={() => (
              <Alarms
                searchAlarms={searchAlarms}
                searchResults={searchResults}
                deleteAlarm={deleteAlarm}
                resumeOrPauseAlarm={resumeOrPauseAlarm}
              />
            )}
          />
          <Redirect to="/dashboard" />
        </Switch>
      </main>

      {/* Add new ( + ) alarm button */}
      <Fab color="primary" aria-label="Add new alarm" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}
export default withRouter(Main);
