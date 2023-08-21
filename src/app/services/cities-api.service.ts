import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityModel } from '../models/city.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class CitiesApiService {
  constructor(private httpService: HttpService) {}

  searchCity(value: string): Observable<CityModel> {
    return this.httpService.get(`https://api.teleport.org/api/cities/?search=${value}`);
  }

  proceedGenericCallWithGET<T>(url: string): Observable<T> {
    return this.httpService.get(url);
  }
}
