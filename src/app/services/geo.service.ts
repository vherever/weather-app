import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GeoModel } from '../models/geo.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class GeoService {
  constructor(private httpService: HttpService) {
  }

  getUserLocationDetails(): Observable<GeoModel> {
    return this.httpService.get(environment.API.GEO.URL);
  }
}
