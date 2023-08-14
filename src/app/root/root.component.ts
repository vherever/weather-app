import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, switchMap, tap, timer } from 'rxjs';
import { CityModelByGeoNameId } from '../models/city.model';
import { WeatherModel } from '../models/weather.model';
import { CitiesApiService } from '../services/cities-api.service';
import { GeoService } from '../services/geo.service';
import { WeatherApiService } from '../services/weather-api.service';
import * as dayjs from 'dayjs';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getCardinalDirection(angle: number): string {
  const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
  return directions[Math.round(angle / 45) % 8];
}

// TODO: check if ts in milliseconds
function getTimeHhMmFromTimestamp(ts: number): string {
  const leadingZero = (num: number) => `0${num}`.slice(-2);
  const dateObj = dayjs(ts * 1000);

  return [dateObj.hour(), dateObj.minute()]
    .map(leadingZero)
    .join(':');
}

function formatMetersToKms(value: number): number {
  return Number((value / 1000).toFixed(1));
}

function getUvIndexStatus(value: number): string {
  /**
   * 0 to 2: Low (green)
   * 3 to 5: Moderate (yellow)
   * 6 to 7: High (orange)
   * 8 to 10: Very High (red)
   * 11 or more: Extreme (purple)
   */
  switch (true) {
    case value <= 2:
      return 'Low';
    case value <= 5:
      return 'Moderate';
    case value <= 7:
      return 'High';
    case value <= 10:
      return 'Very High';
    default:
      return 'Extreme';
  }
}

function getDateFormatted(): string {
  const dateObj = dayjs();
  return `${months[dateObj.month()]}, ${dateObj.hour()}:${dateObj.minute()}:${dateObj.second()}`;
}

function getUvIndexPercentage(value: number): number {
  const MAXIMUM_VALUE = 15;
  return value > 15 ? 100 : Number((value / MAXIMUM_VALUE * 100).toFixed(0));
}

@Component({
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RootComponent {
  public readonly weatherIconRepositoryUrl = 'https://openweathermap.org/img/wn/';

  public locationData$ = this.geoService.getUserLocationDetails().pipe(shareReplay(1)).pipe(
    tap((data) => {
      console.log('lll', data);
    })
  );

  public cityImageUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public weatherData$ = this.locationData$.pipe(
    switchMap((data) => this.weatherService.getWeatherByLonAndLat({ lon: data.loc[0], lat: data.loc[1] })),
    map((res) => ({
      ...res,
      ...this.transformWeatherData(res)
    })),
    tap((res) => {
      console.log('R', res);
    })
  );

  public dateFormatted$ = timer(0, 1000).pipe(
    map(() => getDateFormatted())
  )

  constructor(
    private geoService: GeoService,
    private weatherService: WeatherApiService,
    private citiesApiService: CitiesApiService
  ) {}

  public onSelectedCityEventEmit(value: CityModelByGeoNameId): void {
    console.log('v', `${value._links['city:urban_area']?.href}images`); // photos[0].image.mobile

    /**
     * const obs$ = value._links['city:urban_area'] ? this.citiesApiService.proceedGenericCallWithGET<any>(`${value._links['city:urban_area']?.href}images`) : EMPTY;
     *     this.locationData$ = obs$.pipe(
     *       switchMap(() => this.locationData$),
     *       map((data) => ({
     *         ...data,
     *         city: value.name,
     *         city_image_url: `${value._links['city:urban_area']?.href}images`
     *       }))
     *     );
     */

    this.locationData$ = this.locationData$.pipe(
      map((data) => ({
        ...data,
        city: value.name,
        city_image_url: `${value._links['city:urban_area']?.href}images`
      }))
    )
    const latLon = value.location.latlon;
    this.weatherData$ = this.weatherService.getWeatherByLonAndLat({ lon: latLon.longitude, lat: latLon.latitude }).pipe(
      map((res) => ({
        ...res,
        ...this.transformWeatherData(res)
      }))
    );

    // this.cityImageUrl$.next(`${value._links['city:urban_area']?.href}images`);
  }

  private transformWeatherData(res: WeatherModel): any {
    return {
      current: {
        ...res.current,
        __wind_direction: getCardinalDirection(res.current.wind_deg),
        __sunrise: getTimeHhMmFromTimestamp(res.current.sunrise),
        __sunset: getTimeHhMmFromTimestamp(res.current.sunset),
        __visibility: formatMetersToKms(res.current.visibility),
        __uvi_status: getUvIndexStatus(res.current.uvi),
        __uvi_percentage: getUvIndexPercentage(res.current.uvi),
        __temp: res.current.temp.toFixed(0)
      },
      daily: res.daily.map((o) => ({
        ...o,
        __wind_direction: getCardinalDirection(o.wind_deg),
        __sunrise: getTimeHhMmFromTimestamp(o.sunrise),
        __sunset: getTimeHhMmFromTimestamp(o.sunset),
        __uvi_status: getUvIndexStatus(o.uvi),
        __uvi_percentage: getUvIndexPercentage(o.uvi),
        __temp: {
          day: o.temp.day.toFixed(0),
          eve: o.temp.eve.toFixed(0),
          max: o.temp.max.toFixed(0),
          min: o.temp.min.toFixed(0),
          morn: o.temp.morn.toFixed(0),
          night: o.temp.night.toFixed(0),
        }
      }))
    }
  }
}
