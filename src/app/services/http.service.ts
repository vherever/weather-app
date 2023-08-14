import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defer, EMPTY, Observable, shareReplay } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient, private cacheService: CacheService<any>) {
  }

  get<T>(apiUrl: string, useCache = true): Observable<T> {
    const o$ = this.http.get<T>(apiUrl);
    const data$ = this.getData(apiUrl, useCache, o$);
    return defer(() => {
      return data$ || EMPTY;
    });
  }

  private getData<T>(
    path: string,
    useCache = false,
    o$: Observable<T>
  ): Observable<any> | null {
    let data$ = useCache ? this.cacheService.getValue(path) : o$;
    if (useCache && !data$) {
      data$ = o$.pipe(shareReplay(1));
      this.cacheService.setValue(data$, path);
    }
    return data$;
  }
}
