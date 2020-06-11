import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";
import {
  Button,
  Grid,
  withStyles,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography
} from "@material-ui/core";
import { batterStats, pitcherStats } from "../../store";

const styles = theme => ({
  formControl: {
    width: "100%"
  },
  selectLabel: {
    padding: 5
  },
  gridPadding: {
    padding: 5
  },
  compareGrid: {
    paddingRight: 5
  }
});

const CreateChart = forwardRef((props, ref) => {
  const { classes } = props;
  const [selectedStat, setSelectedStat] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {}, []);

  useImperativeHandle(ref, () => ({
    deselectStat() {
      setButtonDisabled(true);
      setSelectedStat("");
    }
  }));

  const statSelected = e => {
    props.chooseStat(e.target.value, e.nativeEvent.target.textContent);
    setSelectedStat(e.target.value);
    setButtonDisabled(false);
  };

  const statsToUse = props.isBatter ? batterStats : pitcherStats;

  let content = (
    <React.Fragment>
      <Grid item xs={4} sm={6} className={classes.gridPadding}>
        <FormControl className={classes.formControl}>
          <InputLabel id="lblStat" className={classes.selectLabel}>
            Stats
          </InputLabel>
          <Select
            variant="outlined"
            labelId="lblStat"
            id="selectStat"
            value={selectedStat}
            onChange={e => statSelected(e)}
          >
            {statsToUse.map(item => (
              <MenuItem
                key={"mu" + item.value}
                value={item.value}
                name={item.label}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8} sm={6} className={classes.gridPadding}>
        <Button
          onClick={props.sendStats}
          variant="contained"
          color="primary"
          fullWidth={true}
          disabled={buttonDisabled}
        >
          <Typography variant="h6">Create Chart</Typography>
        </Button>
      </Grid>
    </React.Fragment>
  );
  return content;
});

export default withStyles(styles)(CreateChart);
