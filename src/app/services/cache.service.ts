import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import hash from 'hash-it';
import * as dayjs from 'dayjs';

/**
 * This service will cache the same request all over time until application reloads
 */
@Injectable({ providedIn: 'root' })
export class CacheService<T> {
  private readonly CACHE_DURATION_IN_MINUTES = 10;
  private readonly DEFAULT_KEY = 'DEFAULT';

  private cache: {
    [id: string]: {
      expires: Date;
      value: Observable<T>;
    };
  } = {};

  getValue(object?: any): Observable<T> | null {
    const key = object ? hash(object).toString() : this.DEFAULT_KEY;
    const item = this.cache[key];
    if (!item) {
      return null;
    }

    if (dayjs(new Date()).isAfter(item.expires)) {
      return null;
    }

    return item.value;
  }

  setValue(value: Observable<T>, object?: any) {
    const key = object ? hash(object).toString() : this.DEFAULT_KEY;
    const expires = dayjs(new Date())
      .add(this.CACHE_DURATION_IN_MINUTES, 'minutes')
      .toDate();
    this.cache[key] = { expires, value };
  }

  clearCache() {
    this.cache = {};
  }
}
