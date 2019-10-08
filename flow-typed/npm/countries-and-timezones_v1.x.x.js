// flow-typed signature: 10c160cd5c231c3350d53f14f174551a
// flow-typed version: c6154227d1/countries-and-timezones_v1.x.x/flow_>=v0.104.x

declare module 'countries-and-timezones' {
    declare export type CountryInfo = {
      id: string,
      name: string,
      timezone: Array<string>,
      ...
    };
    
    declare export type Countries = { [countryCode: string]: CountryInfo, ... };
    
    declare export type TimezoneInfo = {
      name: string,
      utcOffset: number,
      offsetStr: string,
      countries: Array<string>,
      ...
    }
    
    declare export type Timezones = { [timezoneName: string]: TimezoneInfo, ... }
    
    declare export type RawData = {
      countries: Countries,
      timezones: Timezones,
      ...
    }
  
    declare module.exports: {
      raw: RawData,
      getAllCountries(): Countries,
      getAllTimezones(): Timezones,
      getTimezonesForCountry(countryId: string): Array<TimezoneInfo>,
      getCountriesForTimezone(timezoneId: string): Array<CountryInfo>,
      ...
    };
}
  