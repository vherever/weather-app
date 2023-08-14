import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SearchBoxModule } from '../search-box/search-box.module';
import { TabberModule } from '../shared/tabber/tabber.module';
import { RootComponent } from './root.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SearchBoxModule,
    TabberModule,
  ],
  declarations: [RootComponent]
})
export class RootModule {}
