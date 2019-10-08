/* eslint-disable import/prefer-default-export */
// @flow
import ct from 'countries-and-timezones';

const incorrectTimezones = [
  {
    name: 'Asia/Novosibirsk',
    utcOffset: 420,
    offsetStr: '+07:00',
    countries: [
      'RU',
    ],
  },
];

export const getTimezones = () => {
  const timezones = ct.getTimezonesForCountry('RU');
  // $FlowFixMe
  return timezones
    .map((tz) => {
      const t = incorrectTimezones.find((inc) => inc.name === tz.name) || tz;
      return {
        label: `${t.name} ${t.offsetStr}`,
        value: `${t.name} ${t.offsetStr.replace(':', '')}`,
        name: t.name,
      };
    });
};

export const getOffset = (timezone: string) => {
  const modificator = 360;
  const [name, off] = timezone.split(' ');
  const offset = parseInt(off, 10) / modificator;
  return { name, offset };
};
