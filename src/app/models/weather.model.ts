export interface DailyWeatherModel {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: { day: number; min: number; max: number; night: number; eve: number; morn: number; };
  feels_like: { day: number; night: number; eve: number; morn: number; };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: { id: number; main: string, description: string, icon: string }[];
  clouds: number;
  pop: number;
  uvi: number;
  __wind_direction?: string;
  __sunrise?: string;
  __sunset?: string;
  __visibility?: number;
  __uvi_status?: string;
  __uvi_percentage?: number;
  __temp?: string;
}

export interface WeatherModel {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: { id: number; main: string; description: string, icon: string }[];
    __wind_direction?: string;
    __sunrise?: string;
    __sunset?: string;
    __visibility?: number;
    __uiv_status?: string;
    __uvi_percentage?: number;
    __temp?: string;
  };
  daily: DailyWeatherModel[];

  // clouds: {
  //   all: number;
  // };
  // cod: number;
  // dt: number;
  // id: number;
  // main: {
  //   feels_like: number;
  //   humidity: number;
  //   pressure: number;
  //   temp: number;
  //   temp_max: number;
  //   temp_min: number;
  // };
  // name: string; // City
  // sys: {
  //   country: string;
  //   id: number;
  //   sunrise: number;
  //   sunset: number;
  //   type: number;
  // };
  // weather: {
  //   description: string;
  //   icon: string;
  //   id: number;
  //   main: string;
  // }[];
  // wind: {
  //   deg: number;
  //   gust: number;
  //   speed: number;
  // }
}
