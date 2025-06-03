type UnknownData = Record<string, unknown>;

export interface Stall extends UnknownData {
  name: string;
  label: string;
  levelIndex: number;
}

export const stalls = [
  {
    name: "AHU L24",
    label: `AHU L24`,
    levelIndex: 24,
    coordinates: [
      {
        "x": 63.495234443732585,
        "z": -35.500967647710446,
        "levelIndex": 24
      },
      {
        "x": 60.068222693668844,
        "z": -35.64283245875384,
        "levelIndex": 24
      },
      {
        "x": 60.071012079098665,
        "z": -37.90568025258499,
        "levelIndex": 24
      },
      {
        "x": 63.430601135735365,
        "z": -37.708411377200896,
        "levelIndex": 24
      }
    ],
  },
  // {
  //   "id": "8a61416c-98a0-4a2e-a77c-b280d20f5707",
  //   "name": "AHU 1",
  //   "label": "AHU 1",
  //   "levelIndex": 24,
  //   "coordinates": [
  //     {
  //       "x": 61.47268222820502,
  //       "z": -35.787368108438216,
  //       "levelIndex": 24
  //     },
  //     {
  //       "x": 60.18634941989173,
  //       "z": -35.74815956697712,
  //       "levelIndex": 24
  //     },
  //     {
  //       "x": 60.125652610204526,
  //       "z": -36.64336727196615,
  //       "levelIndex": 24
  //     },
  //     {
  //       "x": 61.49043380673015,
  //       "z": -36.616678873792,
  //       "levelIndex": 24
  //     }
  //   ]
  // }
];

export interface Bell extends UnknownData {
  id: string;
}

export const bells = [
  {
    id: "bell-FCU-L24-021",
    position: {
      levelIndex: 24,
      x: 80.2681985821435,
      z: -60.85317888181622,
      elevation: 2,
    },
  }
];

export interface Zoneicon extends UnknownData {
  id: string;
}

export const zoneicon = [
  {
    id: "zoneicon-AHU-L24-021",
    position: {
      levelIndex: 24,
      x: 77.61402593031958,
      z: -49.8461388994835,
      elevation: 2,
    },
  }
];

export interface Carpet extends UnknownData {
  id: string;
  name: string;
  label: string;
  levelIndex: number;
}

export const carpets = [
  {
    "id": "c2d4294a-d3d2-4b7e-8620-c3e5863d9988",
    "name": "lobby",
    "label": "lobby",
    "levelIndex": 24,
    "coordinates": [
      {
        "x": 109.87037120427405,
        "z": -41.274163950018384,
        "levelIndex": 24
      },
      {
        "x": 109.87192784728575,
        "z": -46.05149509887537,
        "levelIndex": 24
      },
      {
        "x": 103.80201912506487,
        "z": -45.89718687310475,
        "levelIndex": 24
      },
      {
        "x": 103.83729632170206,
        "z": -41.31086711002465,
        "levelIndex": 24
      }
    ],
    "layerType": "polygon",
    "mapped": true
  }

]

export interface Sensors extends UnknownData {
  name: string;
  id: string;
  layerType: string;
  // hits: number;
  levelIndex: number;
  color: string;
  value: number;
}

export const sensors = [
  {
    "id": "6d6a1364-2c59-43dc-bfb0-c0097e073751",
    "name": "Work Area 1",
    "levelIndex": 24,
    "value": 6,
    "color": "#cdcccc",
    "position": {
      "x": 65.59764530958248,
      "z": -49.743210489262516,
      "elevation": 0.010003051534255292,
      "levelIndex": 24
    },
    "layerType": "point"
  },
  {
    "id": "9974c385-2a13-4f1d-b9bb-db11d6b8e6c8",
    "name": "Work Area 2",
    "levelIndex": 24,
    "value": 15,
    "color": "#cdcccc",
    "position": {
      "x": 104.88664378127146,
      "z": -52.44195813448311,
      "elevation": 0.710005190372442,
      "levelIndex": 24
    },
    "layerType": "point"
  },
  {
    "id": "115bce53-34f2-4867-b26b-68ff1118fd7a",
    "name": "Meeting Room 1",
    "levelIndex": 24,
    "value": 5,
    "color": "#cdcccc",
    "position": {
      "x": 79.61402593031958,
      "z": -49.8461388994835,
      "elevation": 0.999865200519551,
      "levelIndex": 24
    },
    "layerType": "point"
  },
  {
    "id": "aee73b57-2929-4539-adc7-d8f19a921683",
    "name": "Meeting Room 2",
    "levelIndex": 24,
    "value": 0,
    "color": "#cdcccc",
    "position": {
      "x": 89.15230378658725,
      "z": -49.87351064621904,
      "elevation": 1.0085652136802423,
      "levelIndex": 24
    },
    "layerType": "point"
  },
  {
    "id": "e6d0c274-8f7d-45f5-bb6c-8ce8ea7a604d",
    "name": "Meeting Room 3",
    "levelIndex": 24,
    "value": 0,
    "color": "#cdcccc",
    "position": {
      "x": 98.22057058601887,
      "z": -49.55614497873867,
      "elevation": 0.8939851784705724,
      "levelIndex": 24
    },
    "layerType": "point"
  }
]

export interface Furnitures extends UnknownData {
  name: string;
  id: string;
  layerType: string;
  // hits: number;
  furnitureId: string;
  color: string;
}

export const furnitures1 = [
  {
    "id": "5686b002-655a-460f-ae46-4d107b33a4d5",
    "name": "Meeting Room 1",
    "color": "#2e1904",
    "furnitureId": "2e6b36a3-2683-4f59-bf20-9b38b3744353",
    "layerType": "furniture"
  },
  {
    "id": "87c94c99-57a3-4aa1-8d43-37601dc272c8",
    "name": "Meeting Room 2",
    "color": "#2e1904",
    "furnitureId": "227115b2-24a0-49fd-ac7a-4bc86580583c",
    "layerType": "furniture"
  },
  {
    "id": "aaa93ca8-8c3b-43f2-b766-6377900cf673",
    "name": "sofa",
    "color": "#093a61",
    "furnitureId": "edeb515e-7a85-4bef-a979-dad6530c1050",
    "layerType": "furniture"
  },
  {
    "id": "dc9ee2bb-aade-4947-8bec-6a6f184494f5",
    "name": "shelf1",
    "color": "#80605d",
    "furnitureId": "d757e258-5ca5-4b8d-82c6-6a3c7f00e388",
    "layerType": "furniture"
  },
  {
    "id": "eeea9797-b356-44d5-9431-e751e37e5c20",
    "name": "shelf2",
    "color": "#80605d",
    "furnitureId": "a25a6b13-0a31-4825-aa71-f9851c83baff",
    "layerType": "furniture"
  },
  {
    "id": "69755535-5b4f-4876-bfe4-7c046e32466f",
    "name": "sofa 2",
    "color": "#093a61",
    "furnitureId": "c8da6bd3-4819-4550-ac6a-628388b7eb03",
    "layerType": "furniture"
  },
  {
    "id": "447990ee-a52e-43e7-994e-00f07c5d40d1",
    "name": "sofa 3",
    "color": "#093a61",
    "furnitureId": "e12a6154-9fd8-4eb4-a889-066d41178491",
    "layerType": "furniture"
  },
  {
    "id": "458206b9-c67c-4733-9f4c-b79a3d0cc9f0",
    "name": "coffee table",
    "color": "#67390a",
    "furnitureId": "7b64b855-6ad5-4c0e-822e-509ade3447aa",
    "layerType": "furniture"
  }
]

export const furnitures = [
  {
    "id": "5686b002-655a-460f-ae46-4d107b33a4d5",
    "name": "Meeting Room 1",
    "color": "#1f1e1e",
    "furnitureId": "2e6b36a3-2683-4f59-bf20-9b38b3744353",
    "layerType": "furniture"
  },
  {
    "id": "87c94c99-57a3-4aa1-8d43-37601dc272c8",
    "name": "Meeting Room 2",
    "color": "#1f1e1e",
    "furnitureId": "227115b2-24a0-49fd-ac7a-4bc86580583c",
    "layerType": "furniture"
  },
  {
    "id": "aaa93ca8-8c3b-43f2-b766-6377900cf673",
    "name": "sofa",
    "color": "#093a61",
    "furnitureId": "edeb515e-7a85-4bef-a979-dad6530c1050",
    "layerType": "furniture"
  },
  {
    "id": "dc9ee2bb-aade-4947-8bec-6a6f184494f5",
    "name": "shelf1",
    "color": "#80605d",
    "furnitureId": "d757e258-5ca5-4b8d-82c6-6a3c7f00e388",
    "layerType": "furniture"
  },
  {
    "id": "eeea9797-b356-44d5-9431-e751e37e5c20",
    "name": "shelf2",
    "color": "#80605d",
    "furnitureId": "a25a6b13-0a31-4825-aa71-f9851c83baff",
    "layerType": "furniture"
  },
  {
    "id": "69755535-5b4f-4876-bfe4-7c046e32466f",
    "name": "sofa 2",
    "color": "#093a61",
    "furnitureId": "c8da6bd3-4819-4550-ac6a-628388b7eb03",
    "layerType": "furniture"
  },
  {
    "id": "447990ee-a52e-43e7-994e-00f07c5d40d1",
    "name": "sofa 3",
    "color": "#093a61",
    "furnitureId": "e12a6154-9fd8-4eb4-a889-066d41178491",
    "layerType": "furniture"
  },
  {
    "id": "458206b9-c67c-4733-9f4c-b79a3d0cc9f0",
    "name": "coffee table",
    "color": "#2e1904",
    "furnitureId": "7b64b855-6ad5-4c0e-822e-509ade3447aa",
    "layerType": "furniture"
  },
  {
    "id": "0b64424f-c57a-4dbb-92df-b61cf08c536c",
    "name": "coffee table 1",
    "color": "#2e1904",
    "furnitureId": "2421d8f2-e76c-41f0-b2cf-d95e96403188",
    "layerType": "furniture"
  },
  {
    "id": "c4c5c5ac-afe0-40c2-93a1-437fac203d6b",
    "name": "coffee table 2",
    "color": "#2e1904",
    "furnitureId": "8c3fcb02-0ca4-4b96-8ca2-491cf726b52b",
    "layerType": "furniture"
  },
  {
    "id": "e866acbe-aa48-4966-9180-619f360adde2",
    "name": "cupboard",
    "color": "#80605d",
    "furnitureId": "7d22f688-57a3-48bb-870d-28e60fe87aa4",
    "layerType": "furniture"
  },
  {
    "id": "18f726b1-ac03-4bcf-95c5-72a8ae17c166",
    "name": "chair",
    "color": "#1f1e1e",
    "furnitureId": "453b4e1b-7059-4fee-84ea-a08d6d5a90a5",
    "layerType": "furniture"
  },
  {
    "id": "82e2f6c9-38c0-40ee-965b-61efca0bb716",
    "name": "chair",
    "color": "#1f1e1e",
    "furnitureId": "8979eb79-ec4e-4d49-a30e-e6715a9f341e",
    "layerType": "furniture"
  },
  {
    "id": "e889f812-ea72-46b8-ae45-ffdeaba42dd4",
    "name": "Discussion Table",
    "color": "#fac391",
    "furnitureId": "07edd56b-a822-43a7-8206-8f6787aadda9",
    "layerType": "furniture"
  },
  {
    "id": "843682ad-d935-44ae-9b6d-41425ac251d9",
    "name": "Meeting Room 3",
    "color": "#2e1904",
    "furnitureId": "81265e6c-2229-4710-9ed6-f630ef32066a",
    "layerType": "furniture"
  },
  {
    "id": "24aa1342-d0a9-4705-ac7c-b7966ccec5a5",
    "name": "Pantry table",
    "color": "#fac391",
    "furnitureId": "2fa1ffed-e4fa-4f08-a223-7e7deea04bb8",
    "layerType": "furniture"
  },
  {
    "id": "378f5057-80b7-4c82-9b77-cf13cd6b9683",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "f1a88657-2be9-4168-884c-3a5e74760d50",
    "layerType": "furniture"
  },
  {
    "id": "abdb3fc5-4518-46b3-b90f-9783ade9ccee",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "7bdf4d58-1c03-4b7c-9f07-30132d29f2de",
    "layerType": "furniture"
  },
  {
    "id": "b630edd4-1a6f-4f3c-8bae-2ba372dc565a",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "51bd5b26-c485-4e0c-99a7-430ee37f1657",
    "layerType": "furniture"
  },
  {
    "id": "0663bd17-1ec6-4405-800f-4390ac067eab",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "011a41c1-081e-4fb5-a5ad-a08c145ea082",
    "layerType": "furniture"
  },
  {
    "id": "725ce757-c07c-448f-8590-919fc0b963af",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "7208793e-c93e-4980-8bc6-22d5a786e008",
    "layerType": "furniture"
  },
  {
    "id": "2d1418b1-aa8f-4fd7-9a7c-24710c30084f",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "f2c55e1a-5f7f-4cde-a586-4b1b6e3dfcac",
    "layerType": "furniture"
  },
  {
    "id": "95a20a77-ed94-40a7-b7c3-ce9617c669d0",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "a585275f-d05e-4d45-a5c2-a0e2566ac43c",
    "layerType": "furniture"
  },
  {
    "id": "6084e382-e4bf-418a-8661-92acc26da265",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "53632964-1bd6-45a2-9387-421f1b847ca4",
    "layerType": "furniture"
  },
  {
    "id": "05fd96ce-9d35-4c39-acc0-49464ae06f25",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "e00f1a92-f049-473e-a9e5-0e1b48e5ce6a",
    "layerType": "furniture"
  },
  {
    "id": "bcc62cd8-b772-4366-a8ef-5e7abd32e397",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "143663b5-20f7-4f11-934e-76440ff7cb1f",
    "layerType": "furniture"
  },
  {
    "id": "570a5eab-6e8f-4160-8ea7-a3e9cbc14a9e",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "39f65422-eaef-48f4-8de6-44b280bed695",
    "layerType": "furniture"
  },
  {
    "id": "a6037b27-def3-429c-9d10-96fc4eb672f3",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "6fecabae-ebea-49f6-a8d7-51d7d42b3f50",
    "layerType": "furniture"
  },
  {
    "id": "21352659-bfbd-4e80-8ac1-80ae451d26a0",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "3dc5f4a2-077d-4cd7-9f2f-6c037b2d494f",
    "layerType": "furniture"
  },
  {
    "id": "b1e2161b-b163-480d-8607-cb4c18c66f63",
    "name": "Flat desk",
    "color": "#80605d",
    "furnitureId": "3dc79cee-0a67-4c77-ab5c-45bc69ae8b80",
    "layerType": "furniture"
  },
  {
    "id": "13ec712f-3638-424d-a28a-93ea13d2661a",
    "name": "shelf 3",
    "color": "#80605d",
    "furnitureId": "c66a8420-ea1e-40e4-ae29-d48e55061b37",
    "layerType": "furniture"
  },
  {
    "id": "f387f2d7-b5c2-46d7-8643-dc1e6e69902e",
    "name": "shelf 4",
    "color": "#80605d",
    "furnitureId": "5d5d03fe-fefe-4933-9b6a-5ede5a6f6d64",
    "layerType": "furniture"
  },
  {
    "id": "f9ea0d84-7624-4020-93b4-8ae880d028d1",
    "name": "shelf 5",
    "color": "#80605d",
    "furnitureId": "91eb6567-48cd-46dc-aaed-2aa5d0334d0e",
    "layerType": "furniture"
  }, {
    "id": "c7e5a9cd-cb6a-41ed-bd94-6a09da2f7fa2",
    "name": "shelf 6",
    "color": "#80605d",
    "furnitureId": "82d1be0c-bbd7-415c-b612-9112046f3c3c",
    "layerType": "furniture"
  },
  {
    "id": "deb686f1-2700-480f-a583-d877bc621a49",
    "name": "shelf 7",
    "color": "#80605d",
    "furnitureId": "0b216a90-6921-4e28-b00f-70ca281bf7fe",
    "layerType": "furniture"
  },
  {
    "id": "582035af-cce1-4dab-9a53-7535acbeaff1",
    "name": "shelf 8",
    "color": "#80605d",
    "furnitureId": "29567d96-6656-42ff-b103-a747915c5d96",
    "layerType": "furniture"
  },
  {
    "id": "95a798b2-4742-4bc4-86bc-78341d3c31ab",
    "name": "shelf 9",
    "color": "#80605d",
    "furnitureId": "d644afec-5d42-41b6-b3be-a6685c7e50db",
    "layerType": "furniture"
  },
  {
    "id": "f7585482-9a51-40b1-a21a-ea213ff5e78d",
    "name": "shelf 10",
    "color": "#80605d",
    "furnitureId": "95ddeac3-4fdb-4d20-9462-505fd8d553fb",
    "layerType": "furniture"
  },
  {
    "id": "877804b6-8738-4cf6-9349-feda0aa2885e",
    "name": "shelf 11",
    "color": "#80605d",
    "furnitureId": "387cfb65-8adb-4ebe-be29-ec11b044acf4",
    "layerType": "furniture"
  },
  {
    "id": "8861f3f5-7bb6-4ee4-9522-96d6e334543a",
    "name": "shelf 12",
    "color": "#80605d",
    "furnitureId": "01daa15e-c9d3-4c12-b2ed-64e2c6219290",
    "layerType": "furniture"
  }
]

export interface Zones extends UnknownData {
  name: string;
  label: string;
  levelIndex: number;
}

export const zones = [
  {
    "id": "b913fd63-2b2f-4715-86bb-5b41a8fca85e",
    "name": "Meeting Room 1",
    "label": "Meeting Room 1",
    "levelIndex": 24,
    "coordinates": [
      {
        "x": 75.09887508707229,
        "z": -45.58072506423229,
        "levelIndex": 24
      },
      {
        "x": 75.11972787992764,
        "z": -50.39781647568846,
        "levelIndex": 24
      },
      {
        "x": 75.73635110167456,
        "z": -50.48463042352312,
        "levelIndex": 24
      },
      {
        "x": 75.97342379153011,
        "z": -54.19385182847831,
        "levelIndex": 24
      },
      {
        "x": 83.45119988248612,
        "z": -53.61000491001195,
        "levelIndex": 24
      },
      {
        "x": 83.41417800305169,
        "z": -45.667822725027285,
        "levelIndex": 24
      }
    ],
    "layerType": "polygon",
    "mapped": false
  }
]
