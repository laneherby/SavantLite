import React from "react";
import { Chip, withStyles } from "@material-ui/core";

const styles = theme => ({
  chips: {
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 2
  }
});

const PlayerList = props => {
  const { classes } = props;
  let content = (
    <React.Fragment>
      {props.players.map(p => (
        <Chip
          color="primary"
          className={classes.chips}
          key={p.PlayerID}
          label={p.FirstName + " " + p.LastName}
          onDelete={() => props.removePlayer(p)}
          onClick={() => props.removePlayer(p)}
        />
      ))}
    </React.Fragment>
  );
  return content;
};

export default withStyles(styles)(PlayerList);
