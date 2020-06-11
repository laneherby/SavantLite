import React, { useState, useEffect } from "react";
import { Group } from "@vx/group";
import { GridRows } from "@vx/grid";
import { scaleBand, scaleLinear } from "@vx/scale";
import { max } from "d3-array";
import { format } from "d3-format";
import { AxisLeft, AxisBottom } from "@vx/axis";
import Tooltip from "@material-ui/core/Tooltip";

const BarChart = props => {
  const sortByKey = (array, key) => {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  const [chartData, setChartData] = useState({ ...props.chartData });
  const [statType, setStatType] = useState({ ...props.statWanted });
  const [statLabel, setStatLabel] = useState({ ...props.statLabel });

  useEffect(() => {
    setChartData(props.chartData);
    setStatType(props.statWanted);
    setStatLabel(props.statLabel);
  }, [props.chartData, props.statWanted, props.statLabel]);

  let content = null;

  if (chartData.length > 0) {
    let data = chartData;

    let alFormat;
    let tickFormat;
    if (statType.includes("per")) {
      alFormat = format(".1%");
      tickFormat = format(".0%");
    } else {
      alFormat = format(".3f");
      tickFormat = format(".3f");
    }

    const x = data => (window.innerWidth >= 960 ? data.name : data.shortName);
    const y = data => data.stat;

    const width =
      window.innerWidth >= 960 ? window.innerWidth / 2 : window.innerWidth - 25;
    const height = window.innerHeight * 0.75;

    const xMax = width - 80;
    const yMax = height - 80;

    let barColors = ["#b2dfdb", "#4db6ac", "#009688", "#00796b", "#004d40"];
    const leagueColor = "#962300";

    switch (data.length) {
      case 2:
        barColors = ["#009688"];
        break;
      case 3:
        barColors = ["#4db6ac", "#00796b"];
        break;
      case 4:
        barColors = ["#4db6ac", "#009688", "#00796b"];
        break;
      case 5:
        barColors = ["#4db6ac", "#009688", "#00796b", "#004d40"];
        break;
      default:
        break;
    }

    const leagueAvg = data.pop();
    data = sortByKey(data, "stat");
    data.push(leagueAvg);

    let dataMax = max(chartData, d => d.stat);

    let xScale = scaleBand({
      rangeRound: [0, xMax],
      padding: 0.1,
      domain:
        window.innerWidth >= 960
          ? data.map(d => d.name)
          : data.map(d => d.shortName)
    });

    let yScaleMax;

    if (dataMax < 1 && dataMax > 0.5) {
      yScaleMax = 1;
    } else if (dataMax <= 0.5) {
      yScaleMax = 0.5;
    } else {
      yScaleMax = Math.round(dataMax * 2) / 2;
    }

    if (yScaleMax <= dataMax) {
      yScaleMax = yScaleMax + 0.5;
    }

    let yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, yScaleMax]
    });

    content = (
      <React.Fragment>
        <svg width={width} height={height}>
          <Group top={25} left={80}>
            <AxisLeft
              scale={yScale}
              numTicks={10}
              label={statLabel}
              labelOffset={50}
              tickFormat={tickFormat}
              stroke={"rgba(255, 255, 255, 0.7)"}
            />
            <GridRows
              scale={yScale}
              width={xMax}
              stroke={"rgba(255, 255, 255, 0.7)"}
            />
            {data.map((d, i) => {
              const label = x(d);
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - yScale(y(d));
              const barX = xScale(label);
              const barY = yMax - barHeight;
              const barColor =
                i === data.length - 1 ? leagueColor : barColors[i];

              return (
                <Tooltip
                  title={d.name + ": " + alFormat(d.stat)}
                  placement="top"
                  key={`tip-${label}`}
                >
                  <rect
                    key={`bar-${label}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill={barColor}
                    bottom={0}
                  />
                </Tooltip>
              );
            })}
            <AxisBottom
              scale={xScale}
              label={
                window.innerWidth >= 960
                  ? "Players"
                  : "Tap and Hold Bar to see Player"
              }
              labelOffset={15}
              top={yMax}
              stroke={"rgba(255, 255, 255, 0.7)"}
              fill={"rgba(255, 255, 255, 0.7)"}
            />
          </Group>
        </svg>
      </React.Fragment>
    );
  }
  return content;
};

export default BarChart;
