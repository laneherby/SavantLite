import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import {
  multiSelectArrays,
  multiSelectStrings,
  comparisons,
  initialDisplay
} from "../../store";
import {
  Grid,
  withStyles,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl
} from "@material-ui/core";

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

const SelectBoxes = forwardRef((props, ref) => {
  const { classes } = props;
  const [displayParams, setDisplayParams] = useState({
    seasons: [],
    outs: [],
    counts: [],
    pitchTypes: [],
    playerHand: [],
    infieldAlignment: [],
    outfieldAlignment: [],
    zones: [],
    runnersOn: [],
    bbTypes: [],
    qualOfContact: [],
    pitchSpeedComparison: "",
    pitchSpeed: "",
    launchAngleComparison: "",
    launchAngle: "",
    exitVelocityComparison: "",
    exitVelocity: ""
  });

  const onSelectChange = (values, name) => {
    //if (values) values = values.map(e => e.value);
    setDisplayParams({ ...displayParams, [name]: values });
    props.updateParameters(values, name);
  };

  useEffect(() => {}, []);

  useImperativeHandle(ref, () => ({
    clearFilters() {
      setDisplayParams(initialDisplay);
    }
  }));

  const onComparisonChange = (value, name) => {
    props.updateParameters(value, name);
  };

  const onKeyPress = event => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regText = /^\d+$/;
    const reg = new RegExp(regText);
    if (!reg.test(keyValue)) {
      event.preventDefault();
    }
    if (event.target.value.length > 10) {
      event.preventDefault();
    }
  };

  const onBlur = event => {
    setDisplayParams({
      ...displayParams,
      [event.target.name]: event.target.value
    });
    props.updateParameters(event.target.value, event.target.name);
  };

  const twoMultiSelect = i => {
    if (i < 10) {
      return (
        <React.Fragment key={"rf" + i}>
          <Grid item xs={12} md={6} className={classes.gridPadding}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.selectLabel} id={"ilbl" + i}>
                {multiSelectStrings[i]}
              </InputLabel>
              <Select
                variant="outlined"
                labelId={"ilbl" + i}
                id={"ms" + i}
                multiple
                value={displayParams[Object.keys(multiSelectArrays)[i]]}
                onChange={e =>
                  onSelectChange(
                    e.target.value,
                    Object.keys(multiSelectArrays)[i]
                  )
                }
              >
                {multiSelectArrays[Object.keys(multiSelectArrays)[i]].map(
                  item => (
                    <MenuItem key={"mu" + item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className={classes.gridPadding}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.selectLabel} id={"ilbl" + (i + 1)}>
                {multiSelectStrings[i + 1]}
              </InputLabel>
              <Select
                variant="outlined"
                labelId={"ilbl" + (i + 1)}
                id={"ms" + (i + 1)}
                multiple
                value={displayParams[Object.keys(multiSelectArrays)[i + 1]]}
                onChange={e =>
                  onSelectChange(
                    e.target.value,
                    Object.keys(multiSelectArrays)[i + 1]
                  )
                }
              >
                {multiSelectArrays[Object.keys(multiSelectArrays)[i + 1]].map(
                  item => (
                    <MenuItem key={"mu" + item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </React.Fragment>
      );
    } else if (i === 10) {
      return (
        <React.Fragment key={"rf" + i}>
          <Grid item xs={12} md={6} className={classes.gridPadding}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.selectLabel} id={"ilbl" + i}>
                {multiSelectStrings[i]}
              </InputLabel>
              <Select
                variant="outlined"
                labelId={"ilbl" + i}
                id={"ms" + i}
                multiple
                value={displayParams[Object.keys(multiSelectArrays)[i]]}
                onChange={e =>
                  onSelectChange(
                    e.target.value,
                    Object.keys(multiSelectArrays)[i]
                  )
                }
              >
                {multiSelectArrays[Object.keys(multiSelectArrays)[i]].map(
                  item => (
                    <MenuItem key={"mu" + item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </React.Fragment>
      );
    }
  };

  let content = (
    <React.Fragment>
      <Grid container direction="row">
        {multiSelectStrings.map((key, i) => {
          if (i % 2 === 0) return twoMultiSelect(i);
          else return null;
        })}
        <Grid
          item
          container
          xs={12}
          md={6}
          className={classes.gridPadding}
          alignItems="center"
        >
          <Grid item xs={4} sm={5} className={classes.compareGrid}>
            <FormControl className={classes.formControl}>
              <FormLabel id="flblPitchSpeed" className={classes.selectLabel}>
                Release Speed
              </FormLabel>
            </FormControl>
          </Grid>
          <Grid item xs={3} className={classes.compareGrid}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="ilblPitchSpeed"
                shrink
                className={classes.selectLabel}
              >
                Comps
              </InputLabel>
              <Select
                variant="outlined"
                labelId="ilblPitchSpeed"
                id="msPitchSpeed"
                value={displayParams.pitchSpeedComparison}
                onChange={e =>
                  onSelectChange(e.target.value, "pitchSpeedComparison")
                }
              >
                {comparisons.map(item => (
                  <MenuItem key={"mu" + item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} sm={4}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="ilblPitchSpeed"
                shrink
                className={classes.selectLabel}
              >
                Value
              </InputLabel>
              <TextField
                name="pitchSpeed"
                value={displayParams.pitchSpeed}
                onKeyPress={onKeyPress}
                onChange={onBlur}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          className={classes.gridPadding}
          alignItems="center"
        >
          <Grid item xs={4} sm={5} className={classes.compareGrid}>
            <FormControl className={classes.formControl}>
              <FormLabel id="flblLaunchAngle" className={classes.selectLabel}>
                Launch Angle
              </FormLabel>
            </FormControl>
          </Grid>
          <Grid item xs={3} className={classes.compareGrid}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="ilblLaunchAngle"
                shrink
                className={classes.selectLabel}
              >
                Comps
              </InputLabel>
              <Select
                variant="outlined"
                labelId="ilblLaunchAngle"
                id="msLaunchAngle"
                value={displayParams.launchAngleComparison}
                onChange={e =>
                  onSelectChange(e.target.value, "launchAngleComparison")
                }
              >
                {comparisons.map(item => (
                  <MenuItem key={"mu" + item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} sm={4}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="ilblLaunchAngle"
                shrink
                className={classes.selectLabel}
              >
                Value
              </InputLabel>
              <TextField
                name="launchAngle"
                value={displayParams.launchAngle}
                onKeyPress={onKeyPress}
                onChange={onBlur}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          className={classes.gridPadding}
          alignItems="center"
        >
          <Grid item xs={4} sm={5} className={classes.compareGrid}>
            <FormControl className={classes.formControl}>
              <FormLabel id="flblExitVelocity" className={classes.selectLabel}>
                Exit Veloctiy
              </FormLabel>
            </FormControl>
          </Grid>
          <Grid item xs={3} className={classes.compareGrid}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="ilblExitVelocity"
                shrink
                className={classes.selectLabel}
              >
                Comps
              </InputLabel>
              <Select
                variant="outlined"
                labelId="ilblExitVelocity"
                id="msExitVelocity"
                value={displayParams.exitVelocityComparison}
                onChange={e =>
                  onSelectChange(e.target.value, "exitVelocityComparison")
                }
              >
                {comparisons.map(item => (
                  <MenuItem key={"mu" + item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} sm={4}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="ilblExitVelocity"
                shrink
                className={classes.selectLabel}
              >
                Value
              </InputLabel>
              <TextField
                name="exitVelocity"
                value={displayParams.exitVelocity}
                onKeyPress={onKeyPress}
                onChange={onBlur}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return content;
});

export default withStyles(styles)(SelectBoxes);
