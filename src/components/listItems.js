import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import { Link } from "react-router-dom";

/* Exports the different option on the menu bar */
export const menuBarItems = (
  <div>
    <Link to="/dashboard">
      <ListItem button>
        <ListItemIcon style={{ justifyContent: "center" }}>
          <DashboardIcon />
        </ListItemIcon>
      </ListItem>
    </Link>
    <Link to="/alarms">
      <ListItem button>
        <ListItemIcon style={{ justifyContent: "center" }}>
          <NewReleasesIcon />
        </ListItemIcon>
      </ListItem>
    </Link>
  </div>
);
