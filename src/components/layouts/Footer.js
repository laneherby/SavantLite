import React from "react";
import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";

const styles = theme => ({
  appbar: { height: "30px" },
  rightText: {
    float: "right",
    paddingRight: 3
  },
  footerPadding: { paddingLeft: 3 }
});

const Footer = props => {
  const { classes } = props;

  let content = (
    <AppBar position="static" className={classes.appbar}>
      <Typography variant="caption">
        <span className={classes.footerPadding}>
          Data is from{" "}
          <a href="https://baseballsavant.mlb.com/">Baseball Savant</a>
        </span>
        <span className={classes.rightText}>
          Site made by{" "}
          <a href="https://twitter.com/laneherby" target="_blank">
            Lane Herberholz
          </a>
        </span>
      </Typography>
    </AppBar>
  );

  return content;
};

export default withStyles(styles)(Footer);
