export interface CityModel {
  count: number;
  _embedded: {
    'city:search-results': CitySearchResult[];
  };
}

export interface CitySearchResult {
  matching_full_name: string;
  _links: LinkCityItem;
}

interface LinkCityItem {
  'city:item': {
    href: string;
  }
}

export interface CityModelByGeoNameId {
  full_name: string;
  geoname_id: number;
  location: {
    geohash: string;
    latlon: {
      latitude: number;
      longitude: number;
    };
  };
  name: string;
  population: number;
  _links: {
    ['city:urban_area']: {
      href: string;
      name: string;
    }
  };
}
