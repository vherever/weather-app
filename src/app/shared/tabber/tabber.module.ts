import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabberComponent } from './tabber.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabberComponent],
  exports: [TabberComponent]
})
export class TabberModule {}
