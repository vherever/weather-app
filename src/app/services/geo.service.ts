import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { GeoModel } from '../models/geo.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class GeoService {
  constructor(private httpService: HttpService) {
  }

  getUserLocationDetails(): Observable<GeoModel> {
    return this.httpService.get(environment.API.GEO.URL);
    // return of({
    //   city: 'Rivne',
    //   country_name: 'Ukraine',
    //   latitude: 50.6223,
    //   longitude: 26.2396,
    // });
  }
}
