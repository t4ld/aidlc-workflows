// Division and Main Work Center data mapping

export interface MainWorkCenter {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface Division {
  id: string;
  label: string;
  mainWorkCenters: MainWorkCenter[];
}

export const divisionData: Division[] = [
  {
    id: 'central-coast',
    label: 'Central Coast',
    mainWorkCenters: [
      { id: 'hollister', label: 'HOLLISTER', disabled: false },
      { id: 'king-city', label: 'KING CITY', disabled: false },
      { id: 'monterey', label: 'MONTEREY', disabled: false },
      { id: 'salinas', label: 'SALINAS', disabled: false },
      { id: 'santa-cruz', label: 'SANTA CRUZ', disabled: false },
      { id: 'watsonville', label: 'WATSONVILLE', disabled: false },
    ],
  },
  {
    id: 'de-anza',
    label: 'De Anza',
    mainWorkCenters: [
      { id: 'cupertino', label: 'CUPERTINO', disabled: false },
    ],
  },
  {
    id: 'diablo',
    label: 'Diablo',
    mainWorkCenters: [
      { id: 'antioch', label: 'ANTIOCH', disabled: false },
      { id: 'concord', label: 'CONCORD', disabled: false },
    ],
  },
  {
    id: 'east-bay',
    label: 'East Bay',
    mainWorkCenters: [
      { id: 'oakport', label: 'OAKPORT', disabled: false },
      { id: 'richmond', label: 'RICHMOND', disabled: false },
    ],
  },
  {
    id: 'fresno',
    label: 'Fresno',
    mainWorkCenters: [
      { id: 'auberry', label: 'AUBERRY', disabled: false },
      { id: 'coalinga', label: 'COALINGA', disabled: false },
      { id: 'dinuba', label: 'DINUBA', disabled: false },
      { id: 'fresno', label: 'FRESNO', disabled: false },
      { id: 'lemoore', label: 'LEMOORE', disabled: false },
      { id: 'selma', label: 'SELMA', disabled: false },
    ],
  },
  {
    id: 'humboldt',
    label: 'Humboldt',
    mainWorkCenters: [
      { id: 'clearlake', label: 'CLEARLAKE', disabled: false },        
      { id: 'eureka', label: 'EUREKA', disabled: false },
      { id: 'fort-bragg', label: 'FORT BRAGG', disabled: false },
      { id: 'fortuna', label: 'FORTUNA', disabled: false },
      { id: 'garberville', label: 'GARBERVILLE', disabled: false },
      { id: 'lakeport', label: 'LAKEPORT', disabled: false },
      { id: 'point-arena', label: 'POINT ARENA', disabled: false },
      { id: 'ukiah', label: 'UKIAH', disabled: false },
      { id: 'willits', label: 'WILLITS', disabled: false },
      { id: 'willow-creek', label: 'WILLOW CREEK', disabled: false },
    ],
  },
  {
    id: 'kern',
    label: 'Kern',
    mainWorkCenters: [
      { id: 'bakersfield', label: 'BAKERSFIELD', disabled: false },
      { id: 'taft', label: 'TAFT', disabled: false },
      { id: 'wasco', label: 'WASCO', disabled: false },
    ],
  },
  {
    id: 'los-padres',
    label: 'Los Padres',
    mainWorkCenters: [
      { id: 'san-luis-obispo', label: 'SAN LUIS OBISPO', disabled: false },
      { id: 'santa-maria', label: 'SANTA MARIA', disabled: false },
      { id: 'templeton', label: 'TEMPLETON', disabled: false },
    ],
  },
  {
    id: 'mission',
    label: 'Mission',
    mainWorkCenters: [
      { id: 'fremont', label: 'FREMONT', disabled: false },
      { id: 'hayward', label: 'HAYWARD', disabled: false },
      { id: 'livermore', label: 'LIVERMORE', disabled: false },
    ],
  },
  {
    id: 'north-bay',
    label: 'North Bay',
    mainWorkCenters: [
      { id: 'napa', label: 'NAPA', disabled: false },
      { id: 'vacaville', label: 'VACAVILLE', disabled: false },
      { id: 'vallejo', label: 'VALLEJO', disabled: false },
    ],
  },
  {
    id: 'north-valley',
    label: 'North Valley',
    mainWorkCenters: [
      { id: 'burney', label: 'BURNEY', disabled: false },
      { id: 'chico', label: 'CHICO', disabled: false },
      { id: 'oroville', label: 'OROVILLE', disabled: false },
      { id: 'quincy', label: 'QUINCY', disabled: false },
      { id: 'red-bluff', label: 'RED BLUFF', disabled: false },
      { id: 'redding', label: 'REDDING', disabled: false },
      { id: 'willows', label: 'WILLOWS', disabled: false },
    ],
  },
  {
    id: 'peninsula',
    label: 'Peninsula',
    mainWorkCenters: [
      { id: 'colma', label: 'COLMA', disabled: false },
      { id: 'san-carlos', label: 'SAN CARLOS', disabled: false },
    ],
  },
  {
    id: 'sacramento',
    label: 'Sacramento',
    mainWorkCenters: [
      { id: 'marysville', label: 'MARYSVILLE', disabled: false },
      { id: 'sacramento', label: 'SACRAMENTO', disabled: false },
      { id: 'woodland', label: 'WOODLAND', disabled: false },
    ],
  },
  {
    id: 'san-francisco',
    label: 'San Francisco',
    mainWorkCenters: [
      { id: 'san-francisco', label: 'SAN FRANCISCO', disabled: false },
    ],
  },
  {
    id: 'san-jose',
    label: 'San Jose',
    mainWorkCenters: [
      { id: 'cinnabar', label: 'CINNABAR', disabled: false },
      { id: 'edenvale', label: 'EDENVALE', disabled: false },
    ],
  },
  {
    id: 'sierra',
    label: 'Sierra',
    mainWorkCenters: [
      { id: 'auburn', label: 'AUBURN', disabled: false },
      { id: 'grass-valley', label: 'GRASS VALLEY', disabled: false },
      { id: 'placerville', label: 'PLACERVILLE', disabled: false },
    ],
  },
  {
    id: 'sonoma',
    label: 'Sonoma',
    mainWorkCenters: [
      { id: 'geyserville', label: 'GEYSERVILLE', disabled: false },
      { id: 'petaluma', label: 'PETALUMA', disabled: false },
      { id: 'san-rafael', label: 'SAN RAFAEL', disabled: false },
      { id: 'santa-rosa', label: 'SANTA ROSA', disabled: false },
    ],
  },
  {
    id: 'stockton',
    label: 'Stockton',
    mainWorkCenters: [
      { id: 'angels-camp', label: 'ANGELS CAMP', disabled: false },
      { id: 'jackson', label: 'JACKSON', disabled: false },
      { id: 'manteca', label: 'MANTECA', disabled: false },
      { id: 'stockton', label: 'STOCKTON', disabled: false },
      { id: 'tracy', label: 'TRACY', disabled: false },
    ],
  },
  {
    id: 'yosemite',
    label: 'Yosemite',
    mainWorkCenters: [
      { id: 'los-banos', label: 'LOS BANOS', disabled: false },
      { id: 'madera', label: 'MADERA', disabled: false },
      { id: 'mariposa', label: 'MARIPOSA', disabled: false },
      { id: 'merced', label: 'MERCED', disabled: false },
      { id: 'newman', label: 'NEWMAN', disabled: false },
      { id: 'oakdale', label: 'OAKDALE', disabled: false },
      { id: 'oakhurst', label: 'OAKHURST', disabled: false },
      { id: 'sonora', label: 'SONORA', disabled: false },
    ],
  },
];

// Helper functions
export const getDivisionOptions = (): string[] => {
  return divisionData.map(division => division.label);
};

export const getMainWorkCentersByDivisions = (selectedDivisions: string[]): MainWorkCenter[] => {
  if (selectedDivisions.length === 0) {
    return [];
  }

  const mainWorkCenters: MainWorkCenter[] = [];
  
  divisionData.forEach(division => {
    if (selectedDivisions.includes(division.label)) {
      mainWorkCenters.push(...division.mainWorkCenters);
    }
  });

  return mainWorkCenters;
};

export const getAllMainWorkCenters = (): MainWorkCenter[] => {
  const allMainWorkCenters: MainWorkCenter[] = [];
  divisionData.forEach(division => {
    allMainWorkCenters.push(...division.mainWorkCenters);
  });
  return allMainWorkCenters;
};
