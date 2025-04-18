import { format, Interval } from 'date-fns';

import { formatWeekInterval } from '~/core/formatters';

import { IntervalUnit } from './types';

export const formatDateInterval = (
  interval: Interval,
  intervalUnit: IntervalUnit,
  isCurrentInterval: boolean
): string => {
  switch (intervalUnit) {
    // case IntervalUnit.day:
    //   return isCurrentInterval
    //     ? 'today'
    //     : format(interval.start, 'dd MMM yyyy');
    case IntervalUnit.week:
      return isCurrentInterval ? 'this week' : formatWeekInterval(interval);
    case IntervalUnit.month:
      return isCurrentInterval
        ? 'this month'
        : format(interval.start, 'MMM yyyy');
    default:
      throw new Error('Unknown interval unit!');
  }
};
