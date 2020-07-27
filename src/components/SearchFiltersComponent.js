import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

/* Used to fill the status selector */
const statusList = ["Running", "Paused"];

/* Function component containing the filters to search for */
/* Through the props, it gets the function that searchs for the alarms */
function SearchFilters(props) {
  /* Using React Hooks for the states of the filters fields */
  const [searchName, setSearchName] = React.useState("");
  const [searchStatus, setSearchStatus] = React.useState("");

  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSearchStatus(event.target.value);
  };

  return (
    <Grid container spacing={3} alignItems="center">
      {/* Input to filter by name */}
      <Grid item xs={12} md={4}>
        <TextField
          id="nameFilter"
          label="Name"
          variant="outlined"
          fullWidth
          onChange={handleNameChange}
          value={searchName}
        />
      </Grid>
      {/* Select to filter by status */}
      <Grid item xs={12} md={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="statusFilterLb">Status</InputLabel>
          <Select
            labelId="statusFilterLb"
            id="statusFilter"
            label="Status"
            onChange={handleStatusChange}
            value={searchStatus}
          >
            {statusList.map((status) => {
              return <MenuItem value={status}>{status}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      {/* Search button */}
      <Grid item xs={12} md={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.searchAlarms(searchName, searchStatus)}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
export default SearchFilters;
