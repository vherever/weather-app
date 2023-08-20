import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap, tap, timer } from 'rxjs';
import { weatherIconRepositoryUrl } from '../app-constants';
import { CityModelByGeoNameId } from '../models/city.model';
import { DailyWeatherModel, WeatherModel } from '../models/weather.model';
import { GeoService } from '../services/geo.service';
import { WeatherApiService } from '../services/weather-api.service';
import * as dayjs from 'dayjs';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getCardinalDirection(angle: number): string {
  const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
  return directions[Math.round(angle / 45) % 8];
}

/**
 * @param ts in seconds
 * @param showSeconds
 */
function getTimeHhMmFromTimestamp(ts?: number, showSeconds?: boolean): string {
  const leadingZero = (num: number) => `0${num}`.slice(-2);
  const dateObj = ts ? dayjs(ts * 1000) : dayjs();
  const timeValuesArr = [dateObj.hour(), dateObj.minute()];
  if (showSeconds) {
    timeValuesArr.push(dateObj.second());
  }

  return timeValuesArr
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
  return `${months[dateObj.month()]} ${dateObj.date()}, ${getTimeHhMmFromTimestamp(undefined, true)}`;
}

function getUvIndexPercentage(value: number): number {
  const MAXIMUM_VALUE = 15;
  return value > 15 ? 100 : Number((value / MAXIMUM_VALUE * 100).toFixed(0));
}

function numberToFixedZero(value: number): number {
  return Number(value.toFixed(0));
}

function timestampToDay(value: number): string {
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(value * 1000);
  const dateObj = dayjs(date);
  return daysInWeek[dateObj.day()];
}

function timestampToDayFull(value: number): string {
  const daysInWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(value * 1000);
  const dateObj = dayjs(date);
  return daysInWeekFull[dateObj.day()];
}

@Component({
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RootComponent {
  public readonly weatherIconRepositoryUrl = weatherIconRepositoryUrl;

  public activeDayNo = 0; // today
  public activeDayName = `Today's Highlights`;

  public locationData$ = this.geoService.getUserLocationDetails().pipe(shareReplay(1));

  public weatherData$ = this.route.queryParams.pipe(
    switchMap((queryParams) => this.locationData$.pipe(
      switchMap((data) => this.weatherService.getWeatherByLonAndLat({ lon: data.loc[0], lat: data.loc[1] }, queryParams['apikey'])),
      map((res) => ({
        ...res,
        ...this.transformWeatherData(res)
      })),
      tap((data) => {
        data.daily[this.activeDayNo].__isActive = true;
      })
    ))
  );

  public dateFormatted$ = timer(0, 1000).pipe(
    map(() => getDateFormatted())
  )

  constructor(
    private geoService: GeoService,
    private weatherService: WeatherApiService,
    private route: ActivatedRoute
  ) {}

  public onActiveItemEventEmit(data: { item: DailyWeatherModel; index: number }): void {
    this.activeDayNo = data.index;
    this.activeDayName =  data.index === 0 ? `Today's Highlights` : `${data.item.__day_full}'s Highlights`;
  }

  public onSelectedCityEventEmit(value: CityModelByGeoNameId): void {
    this.locationData$ = this.locationData$.pipe(
      map((data) => ({
        ...data,
        city: value.name,
        full_name: value.full_name,
        city_image_url: `${value._links['city:urban_area']?.href}images`
      }))
    )
    const latLon = value.location.latlon;
    this.weatherData$ = this.route.queryParams.pipe(
      switchMap((queryParams) => this.weatherService.getWeatherByLonAndLat({ lon: latLon.longitude, lat: latLon.latitude }, queryParams['apikey'])),
      map((res) => ({
        ...res,
        ...this.transformWeatherData(res)
      })),
      tap((data) => {
        data.daily[this.activeDayNo].__isActive = true;
      })
    );
  }

  private transformWeatherData(res: WeatherModel): WeatherModel {
    return {
      ...res,
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
          day: numberToFixedZero(o.temp.day),
          eve: numberToFixedZero(o.temp.eve),
          max: numberToFixedZero(o.temp.max),
          min: numberToFixedZero(o.temp.min),
          morn: numberToFixedZero(o.temp.morn),
          night: numberToFixedZero(o.temp.night)
        },
        __feels_like: {
          day: numberToFixedZero(o.feels_like.day),
          eve: numberToFixedZero(o.feels_like.eve),
          morn: numberToFixedZero(o.feels_like.morn),
          night: numberToFixedZero(o.feels_like.night),
        },
        __day: timestampToDay(o.dt),
        __day_full: timestampToDayFull(o.dt)
      }))
    }
  }
}
