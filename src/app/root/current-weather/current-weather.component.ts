import { Component, Input } from '@angular/core';
import { CurrentWeatherModel, DailyWeatherModel } from '../../models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  @Input() set title(data: string) {
    this.componentTitle = data;
  }

  @Input() set currentWeatherData(data: CurrentWeatherModel | DailyWeatherModel) {
    this.weatherData = data;
  }

  public weatherData: CurrentWeatherModel | DailyWeatherModel;

  public componentTitle: string;
}
