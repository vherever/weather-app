import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SearchBoxModule } from '../search-box/search-box.module';
import { TabberModule } from '../shared/tabber/tabber.module';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { RootComponent } from './root.component';
import { ThisWeekComponent } from './this-week/this-week.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SearchBoxModule,
    TabberModule,
  ],
  declarations: [RootComponent, ThisWeekComponent, CurrentWeatherComponent]
})
export class RootModule {}
