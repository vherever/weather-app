import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tabber',
  templateUrl: './tabber.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabberComponent {}
