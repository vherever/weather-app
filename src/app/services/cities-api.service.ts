import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityModel, CityModelByGeoNameId } from '../models/city.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class CitiesApiService {
  constructor(private httpService: HttpService) {}

  searchCity(value: string): Observable<CityModel> {
    return this.httpService.get(`https://api.teleport.org/api/cities/?search=${value}`);
  }

  getCityDataByGeoId(value: number): Observable<any> {
    return this.httpService.get(`https://api.teleport.org/api/cities/geonameid:${2988507}`);
  }

  getCityDetailsByUrl(value: string): Observable<CityModelByGeoNameId> {
    return this.httpService.get(value);
  }
}
