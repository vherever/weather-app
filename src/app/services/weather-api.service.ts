import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherModel } from '../models/weather.model';
import { HttpService } from './http.service';

const ONE_CALL_DATA = {
  'lat': 50.6231,
  'lon': 26.2274,
  'timezone': 'Europe/Kiev',
  'timezone_offset': 10800,
  'current': {
    'dt': 1691703906,
    'sunrise': 1691722579,
    'sunset': 1691775874,
    'temp': 15.08,
    'feels_like': 14.42,
    'pressure': 1021,
    'humidity': 68,
    'dew_point': 9.23,
    'uvi': 0,
    'clouds': 58,
    'visibility': 10000,
    'wind_speed': 0.97,
    'wind_deg': 104,
    'wind_gust': 1.12,
    'weather': [{ 'id': 803, 'main': 'Clouds', 'description': 'broken clouds', 'icon': '04n' }],
  },
  'daily': [{
    'dt': 1691748000,
    'sunrise': 1691722579,
    'sunset': 1691775874,
    'moonrise': 1691703060,
    'moonset': 1691766960,
    'moon_phase': 0.85,
    'temp': { 'day': 21.02, 'min': 13.07, 'max': 21.02, 'night': 14.15, 'eve': 19.06, 'morn': 14.11 },
    'feels_like': { 'day': 20.82, 'night': 13.92, 'eve': 18.95, 'morn': 13.51 },
    'pressure': 1021,
    'humidity': 63,
    'dew_point': 13.68,
    'wind_speed': 5.23,
    'wind_deg': 321,
    'wind_gust': 5.89,
    'weather': [{ 'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10d' }],
    'clouds': 53,
    'pop': 0.65,
    'rain': 0.75,
    'uvi': 4.78,
  }, {
    'dt': 1691834400,
    'sunrise': 1691809070,
    'sunset': 1691862165,
    'moonrise': 1691792040,
    'moonset': 1691856660,
    'moon_phase': 0.88,
    'temp': { 'day': 21.94, 'min': 11.59, 'max': 22.73, 'night': 15.43, 'eve': 20.72, 'morn': 12.18 },
    'feels_like': { 'day': 21.42, 'night': 14.88, 'eve': 20.47, 'morn': 11.8 },
    'pressure': 1021,
    'humidity': 47,
    'dew_point': 10.12,
    'wind_speed': 4.64,
    'wind_deg': 310,
    'wind_gust': 6.39,
    'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d' }],
    'clouds': 4,
    'pop': 0,
    'uvi': 5.94,
  }, {
    'dt': 1691920800,
    'sunrise': 1691895562,
    'sunset': 1691948454,
    'moonrise': 1691881680,
    'moonset': 1691945580,
    'moon_phase': 0.91,
    'temp': { 'day': 23.89, 'min': 12.71, 'max': 25.11, 'night': 20.04, 'eve': 25.07, 'morn': 13.29 },
    'feels_like': { 'day': 23.69, 'night': 19.95, 'eve': 25.07, 'morn': 12.74 },
    'pressure': 1021,
    'humidity': 52,
    'dew_point': 13.44,
    'wind_speed': 3.39,
    'wind_deg': 275,
    'wind_gust': 6.25,
    'weather': [{ 'id': 802, 'main': 'Clouds', 'description': 'scattered clouds', 'icon': '03d' }],
    'clouds': 49,
    'pop': 0,
    'uvi': 6.6,
  }, {
    'dt': 1692007200,
    'sunrise': 1691982054,
    'sunset': 1692034742,
    'moonrise': 1691971920,
    'moonset': 1692033780,
    'moon_phase': 0.94,
    'temp': { 'day': 26.54, 'min': 16.77, 'max': 29.07, 'night': 22.84, 'eve': 29.07, 'morn': 16.77 },
    'feels_like': { 'day': 26.54, 'night': 22.77, 'eve': 29.17, 'morn': 16.51 },
    'pressure': 1022,
    'humidity': 51,
    'dew_point': 15.52,
    'wind_speed': 2.77,
    'wind_deg': 205,
    'wind_gust': 3.83,
    'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d' }],
    'clouds': 2,
    'pop': 0,
    'uvi': 6.6,
  }, {
    'dt': 1692093600,
    'sunrise': 1692068546,
    'sunset': 1692121029,
    'moonrise': 1692062460,
    'moonset': 1692121560,
    'moon_phase': 0.97,
    'temp': { 'day': 28.48, 'min': 18.62, 'max': 31.79, 'night': 25.12, 'eve': 31.79, 'morn': 18.62 },
    'feels_like': { 'day': 28.1, 'night': 24.94, 'eve': 32.33, 'morn': 18.42 },
    'pressure': 1021,
    'humidity': 40,
    'dew_point': 13.66,
    'wind_speed': 4.59,
    'wind_deg': 166,
    'wind_gust': 7.15,
    'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d' }],
    'clouds': 0,
    'pop': 0,
    'uvi': 6.56,
  }, {
    'dt': 1692180000,
    'sunrise': 1692155038,
    'sunset': 1692207315,
    'moonrise': 1692153180,
    'moonset': 1692209040,
    'moon_phase': 0,
    'temp': { 'day': 29.77, 'min': 19.89, 'max': 32.45, 'night': 25.42, 'eve': 32.05, 'morn': 19.89 },
    'feels_like': { 'day': 29.65, 'night': 25.27, 'eve': 32.72, 'morn': 19.27 },
    'pressure': 1019,
    'humidity': 42,
    'dew_point': 15.64,
    'wind_speed': 4.09,
    'wind_deg': 180,
    'wind_gust': 9.14,
    'weather': [{ 'id': 803, 'main': 'Clouds', 'description': 'broken clouds', 'icon': '04d' }],
    'clouds': 78,
    'pop': 0,
    'uvi': 7,
  }, {
    'dt': 1692266400,
    'sunrise': 1692241530,
    'sunset': 1692293599,
    'moonrise': 1692243840,
    'moonset': 1692296280,
    'moon_phase': 0.03,
    'temp': { 'day': 28.5, 'min': 21.12, 'max': 31.21, 'night': 25.47, 'eve': 31.21, 'morn': 21.12 },
    'feels_like': { 'day': 28.45, 'night': 25.35, 'eve': 31.83, 'morn': 20.51 },
    'pressure': 1016,
    'humidity': 44,
    'dew_point': 15.14,
    'wind_speed': 3.74,
    'wind_deg': 137,
    'wind_gust': 8.36,
    'weather': [{ 'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10d' }],
    'clouds': 100,
    'pop': 0.44,
    'rain': 1.54,
    'uvi': 7,
  }, {
    'dt': 1692352800,
    'sunrise': 1692328022,
    'sunset': 1692379883,
    'moonrise': 1692334440,
    'moonset': 1692383400,
    'moon_phase': 0.06,
    'temp': { 'day': 28.91, 'min': 20.32, 'max': 31.47, 'night': 24.6, 'eve': 30.94, 'morn': 20.32 },
    'feels_like': { 'day': 28.7, 'night': 24.47, 'eve': 31.61, 'morn': 19.87 },
    'pressure': 1016,
    'humidity': 42,
    'dew_point': 14.8,
    'wind_speed': 3.3,
    'wind_deg': 45,
    'wind_gust': 4.2,
    'weather': [{ 'id': 802, 'main': 'Clouds', 'description': 'scattered clouds', 'icon': '03d' }],
    'clouds': 50,
    'pop': 0,
    'uvi': 7,
  }],
};

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
  constructor(private http: HttpService) {
  }

  getWeatherByLonAndLat(reqData: { lon: number; lat: number }): Observable<WeatherModel> {
    return this.http.get(`${environment.API.WEATHER.URL}&lon=${reqData.lon}&lat=${reqData.lat}&exclude=hourly`);
    // return of(ONE_CALL_DATA);
  }

  getWeatherByCity(city: string): Observable<WeatherModel> {
    // return this.http.get(`${environment.API.WEATHER.URL}&q=${city}`);

    return of({}) as any;
  }
}
