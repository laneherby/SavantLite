import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  withStyles,
  InputLabel
} from "@material-ui/core";

const styles = theme => ({
  flex: {
    flex: 1
  },
  switchLabel: {
    color: "#ffffff"
  }
});

const Header = props => {
  const { classes } = props;

  let content = (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" color="inherit" className={classes.flex}>
          Baseball App
        </Typography>
        <InputLabel className={classes.switchLabel}>Batting</InputLabel>
        <Switch
          onChange={e => props.onPlayerTypeChange(e)}
          color="default"
          inputProps={{ "aria-label": "checkbox with default color" }}
        />
        <InputLabel className={classes.switchLabel}>Pitching</InputLabel>
      </Toolbar>
    </AppBar>
  );
  return content;
};

export default withStyles(styles)(Header);
