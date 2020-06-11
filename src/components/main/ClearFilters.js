import React from "react";
import { Button, withStyles, Typography } from "@material-ui/core";

const styles = theme => ({});

const ClearFilters = props => {
  const { classes } = props;

  let content = (
    <React.Fragment>
      <Button onClick={props.clearFilters} variant="contained" color="primary">
        <Typography variant="h6">Clear Filters</Typography>
      </Button>
    </React.Fragment>
  );
  return content;
};

export default withStyles(styles)(ClearFilters);
