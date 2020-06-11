import React, { useState, useRef } from "react";
import {
  SearchBox,
  PlayerList,
  SelectBoxes,
  SetFilters,
  BarChart,
  CreateChart,
  ClearFilters
} from "./components/main";
import { Header, Footer } from "./components/layouts";
import { Grid, Paper, withStyles, CssBaseline, Fade } from "@material-ui/core";
import { initialParams } from "./store";

const styles = theme => ({
  playerSearch: {
    padding: 10
  },
  playerList: {
    padding: 5,
    minHeight: "50px"
  },
  paper: {
    padding: 10,
    [theme.breakpoints.up("md")]: {
      height: "calc(100% - 64px - 40px)"
    },
    overflowY: "auto",
    marginTop: 5,
    marginBottom: 5
  },
  loadingGrid: {
    minHeight: 60,
    verticalAlign: "middle",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row-reverse"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  "@global": {
    "html, body, #root": {
      height: "100%"
    }
  }
});

const App = props => {
  const { classes } = props;
  const searchBoxRef = useRef();
  const clearFilterRef = useRef();
  const deselectStatRef = useRef();
  const [playerList, setPlayerList] = useState([]);
  const [playerResults, setPlayerResults] = useState([]);
  const [statWanted, setStatWanted] = useState("");
  const [statLabel, setStatLabel] = useState("");
  const [chartData, setChartData] = useState([]);
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [isBatter, setIsBatter] = useState(true);
  const [playerParams, setPlayerParams] = useState({
    seasons: [],
    outs: [],
    counts: [],
    pitchTypes: [],
    hand: [],
    infieldAlignment: [],
    outfieldAlignment: [],
    zones: [],
    onFirst: null,
    onSecond: null,
    onThird: null,
    bbTypes: [],
    qualOfContact: [],
    pitchSpeedComparison: "",
    pitchSpeed: "",
    launchAngleComparison: "",
    launchAngle: "",
    exitVelocityComparison: "",
    exitVelocity: ""
  });

  const updateParameters = (values, name) => {
    switch (name) {
      case "runnersOn":
        const locFirst = values.includes(1) ? 1 : null;
        const locSecond = values.includes(2) ? 1 : null;
        const locThird = values.includes(3) ? 1 : null;

        setPlayerParams({
          ...playerParams,
          onFirst: locFirst,
          onSecond: locSecond,
          onThird: locThird
        });
        break;
      default:
        setPlayerParams({ ...playerParams, [name]: values });
        break;
    }
  };

  const updateStatResults = result => {
    setPlayerResults(result);
  };

  const addPlayer = player => {
    if (
      playerList.length < 5 &&
      playerList.findIndex(p => p.PlayerID === player.PlayerID) === -1
    ) {
      const newPlayerList = [...playerList, player];
      setPlayerList(newPlayerList);
      searchBoxRef.current.clearTextBox();
    }
  };

  const removePlayer = player => {
    const newPlayerList = playerList.filter(
      p => p.PlayerID !== player.PlayerID
    );
    setPlayerList(newPlayerList);
  };

  const chooseStat = (stat, label) => {
    setStatWanted(stat);
    setStatLabel(label);
  };

  const sendStats = () => {
    const names = playerResults.map(p => p.Name);
    const shortNames = playerResults.map(p => p.Name.substring(0, 4) + "..");
    const stats = playerResults.map(p => p[statWanted]);
    let chartData = [];
    names.forEach((n, index) => {
      chartData.push({
        name: n,
        shortName: shortNames[index],
        stat: stats[index]
      });
    });
    setChartData(chartData);

    if (window.innerHeight < 960) {
      setTimeout(function() {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
      }, 250);
    }
  };

  const clearFilters = () => {
    setPlayerParams(initialParams);
    setStatsLoaded(false);
    clearFilterRef.current.clearFilters();
    deselectStatRef.current.deselectStat();
    setPlayerList([]);
    setPlayerParams([]);
    setChartData([]);
    setPlayerResults([]);
    setStatLabel("");
    setStatWanted("");
  };

  const onPlayerTypeChange = e => {
    setIsBatter(!isBatter);
    clearFilters();
  };

  let content = (
    <React.Fragment>
      <CssBaseline />
      <Header onPlayerTypeChange={onPlayerTypeChange} />

      <Paper className={classes.paper}>
        <Grid container direction="row">
          <Grid item xs={12} md={6}>
            <Grid item container direction="row">
              <Grid item xs={6} className={classes.playerSearch}>
                <SearchBox ref={searchBoxRef} addPlayer={addPlayer} />
              </Grid>
              <Grid
                item
                xs={6}
                className={classes.playerSearch}
                style={{ textAlign: "right" }}
              >
                <ClearFilters clearFilters={clearFilters} />
              </Grid>
              <Grid item xs={12} className={classes.playerList}>
                <PlayerList players={playerList} removePlayer={removePlayer} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <SelectBoxes
                updateParameters={updateParameters}
                currentParameters={playerParams}
                ref={clearFilterRef}
              />
            </Grid>
            <Grid container item direction="row">
              <Grid
                item
                container
                xs={12}
                sm={6}
                justify="space-between"
                alignItems="center"
                className={classes.loadingGrid}
              >
                <SetFilters
                  playerList={playerList}
                  playerParams={playerParams}
                  updateStatResults={updateStatResults}
                  sendStats={sendStats}
                  setStatsLoaded={setStatsLoaded}
                  isBatter={isBatter}
                />
              </Grid>

              <Fade
                in={statsLoaded}
                {...(statsLoaded ? { timeout: 1500 } : {})}
              >
                <Grid
                  item
                  container
                  xs={12}
                  sm={6}
                  justify="space-between"
                  alignItems="center"
                >
                  <CreateChart
                    chooseStat={chooseStat}
                    ref={deselectStatRef}
                    sendStats={sendStats}
                    isBatter={isBatter}
                  />
                </Grid>
              </Fade>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <BarChart
              statWanted={statWanted}
              statLabel={statLabel}
              chartData={chartData}
            />
          </Grid>
        </Grid>
      </Paper>

      <Footer />
    </React.Fragment>
  );

  return content;
};

export default withStyles(styles)(App);
