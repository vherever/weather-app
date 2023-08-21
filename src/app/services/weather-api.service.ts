import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherModel } from '../models/weather.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
  constructor(private http: HttpService) {
  }

  getWeatherByLonAndLat(reqData: { lon: number; lat: number }, apiKey: string): Observable<WeatherModel> {
    return this.http.get(`${environment.API.WEATHER.URL}&lon=${reqData.lon}&lat=${reqData.lat}&exclude=hourly&appId=${apiKey}`);
  }
}
