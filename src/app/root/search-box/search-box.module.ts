import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, NgFor, AsyncPipe],
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
