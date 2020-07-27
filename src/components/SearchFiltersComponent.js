import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

/* Function component containing the filters to search for */
function SearchFilters() {
  return (
    <Grid container spacing={3} alignItems="center">
      {/* Input to filter by name */}
      <Grid item xs={12} md={4}>
        <TextField id="nameFilter" label="Name" variant="outlined" fullWidth />
      </Grid>
      {/* Input to filter by status */}
      <Grid item xs={12} md={4}>
        <TextField
          id="statusFilter"
          label="Status"
          variant="outlined"
          fullWidth
        />
      </Grid>
      {/* Search button */}
      <Grid item xs={12} md={2}>
        <Button variant="contained" color="primary">
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
export default SearchFilters;
