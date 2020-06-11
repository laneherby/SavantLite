export const multiSelectArrays = {
  seasons: [
    { label: 2019, value: 2019 },
    { label: 2018, value: 2018 },
    { label: 2017, value: 2017 },
    { label: 2016, value: 2016 }
  ],
  outs: [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 }
  ],
  counts: [
    { label: "0-0", value: 1 },
    { label: "0-1", value: 2 },
    { label: "0-2", value: 3 },
    { label: "1-0", value: 4 },
    { label: "1-1", value: 5 },
    { label: "1-2", value: 6 },
    { label: "2-0", value: 7 },
    { label: "2-1", value: 8 },
    { label: "2-2", value: 9 },
    { label: "3-0", value: 10 },
    { label: "3-1", value: 11 },
    { label: "3-2", value: 12 }
  ],
  zones: [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "14", value: 14 }
  ],
  pitchTypes: [
    { label: "4 Seam Fastball", value: 3 },
    { label: "2 Seam Fastball", value: 1 },
    { label: "Slider", value: 2 },
    { label: "Sinker", value: 8 },
    { label: "Curveball", value: 5 },
    { label: "Changeup", value: 4 },
    { label: "Knuckle Curve", value: 7 },
    { label: "Cutter", value: 6 },
    { label: "Splitter", value: 13 },
    { label: "Forkball", value: 14 },
    { label: "Screwball", value: 15 },
    { label: "Knuckleball", value: 11 },
    { label: "Eephus", value: 12 }
  ],
  bbTypes: [
    { label: "Popup", value: 1 },
    { label: "Fly Ball", value: 2 },
    { label: "Ground Ball", value: 3 },
    { label: "Line Drive", value: 4 }
  ],
  qualOfContact: [
    { label: "Weak", value: 1 },
    { label: "Topped", value: 2 },
    { label: "Under", value: 3 },
    { label: "Flare", value: 4 },
    { label: "Solid Contact", value: 5 },
    { label: "Barrel", value: 6 }
  ],
  runnersOn: [
    { label: "1B", value: 1 },
    { label: "2B", value: 2 },
    { label: "3B", value: 3 }
  ],
  infieldAlignment: [
    { label: "Standard", value: 2 },
    { label: "Shift", value: 1 },
    { label: "Strategic", value: 3 }
  ],
  outfieldAlignment: [
    { label: "Standard", value: 1 },
    { label: "Strategic", value: 2 },
    { label: "Extreme Shift", value: 5 },
    { label: "4th Outfielder", value: 4 }
  ],
  playerHand: [
    { label: "Right", value: "R" },
    { label: "Left", value: "L" }
  ]
};

export const multiSelectStrings = [
  "Seasons",
  "Outs",
  "Counts",
  "Pitch Zones",
  "Pitch Types",
  "Batted Ball Types",
  "Quality of Contact",
  "Runners On",
  "IF Alignment",
  "OF Alignment",
  "Handedness"
];

export const comparisons = [
  { label: "=", value: "=" },
  { label: ">", value: ">" },
  { label: "<", value: "<" },
  { label: ">=", value: ">=" },
  { label: "<=", value: "<=" }
];

export const batterStats = [
  { label: "AVG", value: "AVG" },
  { label: "OBP", value: "OBP" },
  { label: "SLG", value: "SLG" },
  { label: "OPS", value: "OPS" },
  { label: "ISO", value: "ISO" },
  { label: "wOBA", value: "wOBA" },
  { label: "K%", value: "Kperc" },
  { label: "BB%", value: "BBperc" },
  { label: "LD%", value: "LDperc" },
  { label: "GB%", value: "GBperc" },
  { label: "FB%", value: "FBperc" },
  { label: "Barrel%", value: "Barrelperc" }
];

export const pitcherStats = [
  { label: "BAA", value: "BAA" },
  { label: "FIP", value: "FIP" },
  { label: "HR/FB", value: "HRperFB" },
  { label: "K%", value: "Kperc" },
  { label: "BB%", value: "BBperc" },
  { label: "LD%", value: "LDperc" },
  { label: "GB%", value: "GBperc" },
  { label: "FB%", value: "FBperc" },
  { label: "Barrel%", value: "Barrelperc" }
];

export const initialParams = {
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
};

export const initialDisplay = {
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
};
