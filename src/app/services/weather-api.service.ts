import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherModel } from '../models/weather.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
  private queryParams$ = this.route.queryParams;

  constructor(private http: HttpService, private route: ActivatedRoute) {
  }

  getWeatherByLonAndLat(reqData: { lon: number; lat: number }): Observable<WeatherModel> {
    return <Observable<WeatherModel>>this.queryParams$.pipe(
      switchMap((params) => this.http.get(`${environment.API.WEATHER.URL}&lon=${reqData.lon}&lat=${reqData.lat}&exclude=hourly&appId=${params['apikey']}`))
    );
  }
}
