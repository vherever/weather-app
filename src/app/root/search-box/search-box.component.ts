import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, Observable, startWith, switchMap } from 'rxjs';
import { CityModelByGeoNameId, CitySearchResult } from '../../models/city.model';
import { CitiesApiService } from '../../services/cities-api.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit {
  @Output() selectedCityEventEmitter: EventEmitter<CityModelByGeoNameId> = new EventEmitter<CityModelByGeoNameId>();

  public searchInput = new FormControl();
  public filteredOptions$: Observable<CitySearchResult[]>;

  constructor(private citiesService: CitiesApiService) {}

  ngOnInit() {
    this.filteredOptions$ = this.searchInput.valueChanges
      .pipe(
        startWith(''),
        filter(text => text.length >= 3),
        debounceTime(400),
        switchMap(value => this.filterOptions(value))
      );
  }

  public onOptionSelected(option: CitySearchResult): void {
    this.citiesService.proceedGenericCallWithGET<CityModelByGeoNameId>(option._links['city:item'].href).subscribe((res) => {
      this.selectedCityEventEmitter.next(res);
    });
  }

  displayFn(option: CitySearchResult): string {
    return option?.matching_full_name || '';
  }

  private filterOptions(value: string): Observable<CitySearchResult[]> {
    return this.citiesService.searchCity(value.toLowerCase()).pipe(
      filter(data => !!data),
      map((data) => data._embedded['city:search-results']),
      map((data) => data)
    )
  }
}
