export interface DailyWeatherModel {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: WeatherTemperatureModel;
  feels_like: { day: number; night: number; eve: number; morn: number; };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherPropertyModel[];
  clouds: number;
  uvi: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  pop: number;
  __wind_direction?: string;
  __sunrise?: string;
  __sunset?: string;
  __visibility?: number;
  __uvi_status?: string;
  __uvi_percentage?: number;
  __temp?: WeatherTemperatureModel;
  __feels_like?: Partial<WeatherTemperatureModel>;
  __day?: string;
  __day_full?: string;
  __isActive?: boolean;
}

export interface WeatherTemperatureModel {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

export interface CurrentWeatherModel {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherPropertyModel[];
  clouds: number;
  uvi: number;
  visibility: number;
  __wind_direction?: string;
  __sunrise?: string;
  __sunset?: string;
  __visibility?: number;
  __uvi_status?: string;
  __uvi_percentage?: number;
  __temp?: string;
  __feels_like?: WeatherTemperatureModel;
}

export interface WeatherModel {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeatherModel;
  daily: DailyWeatherModel[];
}

interface WeatherPropertyModel {
  id: number;
  main: string;
  description: string;
  icon: string;
}
