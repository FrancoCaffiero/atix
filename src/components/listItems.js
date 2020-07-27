import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import NewReleasesIcon from "@material-ui/icons/NewReleases";

/* Exports the different option on the menu bar */
export const menuBarItems = (
  <div>
    <ListItem button>
      <ListItemIcon style={{ justifyContent: "center" }}>
        <DashboardIcon />
      </ListItemIcon>
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{ justifyContent: "center" }}>
        <NewReleasesIcon />
      </ListItemIcon>
    </ListItem>
  </div>
);
