import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingOverlayComponent } from './loading-overlay.component';

@NgModule({
  imports: [CommonModule],
  exports: [LoadingOverlayComponent],
  declarations: [LoadingOverlayComponent]
})
export class LoadingOverlayModule {}
