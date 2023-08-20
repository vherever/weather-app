import { Component, EventEmitter, Input, Output } from '@angular/core';
import { weatherIconRepositoryUrl } from 'src/app/app-constants';
import { DailyWeatherModel } from '../../models/weather.model';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.scss']
})
export class ThisWeekComponent {
  @Input() weeklyData: DailyWeatherModel[];

  @Output() activeItemEventEmitter: EventEmitter<{ item: DailyWeatherModel, index: number }> = new EventEmitter<{ item: DailyWeatherModel, index: number }>();

  public readonly weatherIconRepositoryUrl = weatherIconRepositoryUrl;

  public onItemCLick(item: DailyWeatherModel, index: number): void {
    this.weeklyData.forEach((o) => {
      o.__isActive = false;
    });
    item.__isActive = true;
    this.activeItemEventEmitter.next({ item, index });
  }
}
