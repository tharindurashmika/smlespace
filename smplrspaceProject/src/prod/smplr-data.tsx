type UnknownData = Record<string, unknown>;

export interface Stall extends UnknownData {
  name: string;
  label: string;
  hits: number;
  levelIndex: number;
}

export const stalls = [
    {
        name: "FCU-L24-021",
        label: `FCU-L24-021`,
        hits: 19,
        levelIndex: 24,
        coordinates: [
          {
            x: 82.08605854524738,
            z: -59.32510550294984,
            levelIndex: 24,
          },
          {
            x: 80.2681985821435,
            z: -59.43317888181622,
            levelIndex: 24,
          },
          {
            x: 79.7419233844819,
            z: -58.190004671048925,
            levelIndex: 24,
          },
          {
            x: 81.5750882090407,
            z: -58.196045820447395,
            levelIndex: 24,
          },
        ],
    }
];

export interface Sensor extends UnknownData {
  id: string;
}

export const sensors = [
  {
    id: "IW27",
    position: {
      levelIndex: 24,
      x: 80.2681985821435,
      z: -59.43317888181622,
      elevation: 2,
    },
  }
];