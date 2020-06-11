import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  withStyles,
  Paper
} from "@material-ui/core";

const styles = theme => ({
  paperList: {
    position: "absolute",
    zIndex: 10,
    maxHeight: "50%",
    overflow: "auto"
  },
  list: {
    textDecoration: "none",
    "&$selected, &$selected:hover, &$selected:focus": {
      backgroundColor: theme.palette.action.selected
    }
  },
  listItem: {
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shortest
    }),
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.palette.action.hover,
      cursor: "pointer",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    "&:focus": {
      backgroundColor: theme.palette.action.hover
    }
  }
});

const SearchSuggestions = props => {
  const { classes } = props;

  let content = (
    <React.Fragment>
      <Paper className={classes.paperList}>
        <List className={classes.list} fullWidth>
          {props.results.slice(0, 15).map(r => (
            <ListItem
              fullWidth
              className={classes.listItem}
              divider={props.results.length > 1 ? true : false}
              key={r.PlayerID}
              onClick={props.addPlayer.bind(this, r)}
            >
              <ListItemText>
                {r.FirstName} {r.LastName}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
  return content;
};

export default withStyles(styles)(SearchSuggestions);
