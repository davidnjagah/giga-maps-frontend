import { sub } from 'date-fns';

import { getInterval } from '~/lib/date-fns-kit';
import { IntervalUnit } from '~/lib/date-fns-kit/types';

import { LayerType, MultischoolSelectionStats } from '@/sidebar/types';

const date = new Date();
// date.setMonth(date.getMonth())
export const defaultInterval = () => getInterval(sub(date, { [`weeks`]: 1 }), IntervalUnit.week);
export const defaultIntervalMonth = () => getInterval(date, IntervalUnit.month)

export enum Layers {
  schoolConnectivity = 'connectivity_status',
  download = 'download',
  uptime = 'uptime',
  latency = 'latency',
  connectivity = 'connectivity',
  coverage = 'coverage'
}

export enum ConnectivityStatusDistribution {
  connected = 'connected',
  notConnected = 'not_connected',
  unknown = 'unknown'
}

export enum ConnectivityDistribution {
  good = 'good',
  moderate = 'moderate',
  noInternet = 'no_internet',
  no = 'no', // it is equalant to notInternet
  bad = 'bad', // it is equalant to notInternet
  unknown = 'unknown'
}

export enum ConnectivityBenchMarks {
  global = 'global',
  national = 'national',
}


export enum CoverageBenchMarks {
  G5_4 = '5g_4g',
  G3_2 = '3g_2g',
  noCoverage = 'no_coverage',
  unknown = 'unknown'
}

export const multiSchoolSelection: MultischoolSelectionStats = {
  countryId: 0,
  schoolIds: []
}

export const SCHOOL_STATUS_LAYER = {
  id: 10000,
  name: 'School status',
  type: 'SCHOOL_STATUS',
  legend_configs: {
    good: {
      values: ["connected"],
      labels: "Connected"
    },
    bad: {
      values: ["not_connected"],
      labels: "Not connected"
    },
    unknown: {
      values: [],
      labels: "Unknown"
    }
  }
}
export const defaultGigaLayerList = [
  {
    id: 10001,
    created_by: null,
    name: 'Download speed',
    type: 'LIVE',
    data_sources_list: null,
    global_benchmark: {
      unit: "bps",
      value: "2000000"
    },
    applicable_countries: [],
    legend_configs: null
  },
  {
    id: 10002,
    created_by: null,
    name: 'Mobile coverage ',
    type: 'STATIC',
    data_sources_list: null,
    global_benchmark: null,
    applicable_countries: [],
    legend_configs: {
      good: {
        values: ["5G", "4G"],
        labels: "5G/4G"
      },
      moderate: {
        values: ["3G", "2G"],
        labels: "3G/2G"
      },
      bad: {
        values: ["no"],
        labels: "No internet"
      },
      unknown: {
        values: [],
        labels: "Unknown"
      }
    }
  }
] as LayerType[]

const conversionFormula = {
  "mbps": "{val} / (1000 * 1000)"
} as Record<string, string>;
export const getDefaultFormula = (unit: string) => {
  if (unit in conversionFormula) {
    return conversionFormula[unit]
  }
  return "{val}";
}