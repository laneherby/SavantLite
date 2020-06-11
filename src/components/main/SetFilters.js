import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  CircularProgress,
  Typography,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  gridPadding: {
    padding: 5
  }
});

const SetFilters = props => {
  const { classes } = props;
  const [isLoading, setIsLoading] = useState(false);

  const getStats = () => {
    setIsLoading(true);
    let playerIDs;
    if (props.playerList[0] === "") {
      playerIDs = props.playerList;
    } else {
      playerIDs = props.playerList.map(p => p.PlayerID);
    }

    const url = props.isBatter
      ? "http://192.168.0.169:3000/api/getBatterStats"
      : "http://192.168.0.169:3000/api/getPitcherStats";

    axios
      .get(url, {
        params: {
          playerIDs: playerIDs,
          seasons: props.playerParams.seasons,
          outs: props.playerParams.outs,
          counts: props.playerParams.counts,
          pitchTypes: props.playerParams.pitchTypes,
          hand: props.playerParams.hand,
          infieldAlignment: props.playerParams.infieldAlignment,
          outfieldAlignment: props.playerParams.outfieldAlignment,
          zones: props.playerParams.zones,
          onFirst: props.playerParams.onFirst,
          onSecond: props.playerParams.onSecond,
          onThird: props.playerParams.onThird,
          bbTypes: props.playerParams.bbTypes,
          qualOfContact: props.qualOfContact,
          pitchSpeedComparison: props.playerParams.pitchSpeedComparison,
          pitchSpeed: props.playerParams.pitchSpeed,
          launchAngleComparison: props.playerParams.launchAngleComparison,
          launchAngle: props.playerParams.launchAngle,
          exitVelocityComparison: props.playerParams.exitVelocityComparison,
          exitVelocity: props.playerParams.exitVelocity
        }
      })
      .then(res => {
        props.updateStatResults(res.data.map(pRes => pRes[0]));
        setIsLoading(false);
        props.setStatsLoaded(true);
      });
  };

  let content = (
    <React.Fragment>
      <Grid item xs={8} sm={6} className={classes.gridPadding}>
        <Button
          onClick={getStats}
          variant="contained"
          color="primary"
          fullWidth={true}
          className={classes.buttonCase}
        >
          <Typography variant="h6" className={classes.fontClass}>
            Set Filters
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={2} sm={4} className={classes.gridPadding}>
        {isLoading ? (
          <CircularProgress color="secondary" variant="indeterminate" />
        ) : null}
      </Grid>
    </React.Fragment>
  );

  return content;
};

export default withStyles(styles)(SetFilters);
