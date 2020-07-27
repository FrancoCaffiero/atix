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
  const [amountActiveAlerts, setAmountActiveAlerts] = React.useState(0);
  React.useEffect(() => {
    setAmountActiveAlerts(alarms.filter((a) => !a.paused).length); //Lambda expression to count the amount of alarms with paused = false
  }, [alarms]);

  return (
    <div className={classes.root}>
      {/* Material UI style-normalizations */}
      <CssBaseline />

      {/* Fixed Top Bar with Notification Badge */}
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" className={classes.toolbarIcon}>
            <Badge badgeContent={amountActiveAlerts} color="secondary">
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
          <Route path="/dashboard" component={Dashboard} />
          <Route
            path="/alarms"
            component={() => (
              <Alarms
                searchAlarms={searchAlarms}
                searchResults={searchResults}
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
