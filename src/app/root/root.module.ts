import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { MapComponent } from './map/map.component';
import { RootComponent } from './root.component';
import { SearchBoxModule } from './search-box/search-box.module';
import { ThisWeekComponent } from './this-week/this-week.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SearchBoxModule
  ],
  declarations: [RootComponent, ThisWeekComponent, CurrentWeatherComponent, MapComponent]
})
export class RootModule {}
