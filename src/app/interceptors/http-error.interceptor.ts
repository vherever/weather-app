import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor<T> implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar) {}

  intercept(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const handleError = (error: HttpErrorResponse) => throwError(() => error);

    const showSnackbar = (error: HttpErrorResponse, customMessage?: string) => {
      this.snackbar.open(customMessage || error.error.message, 'Okay', {
        duration: 5000
      })
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case HttpStatusCode.BadRequest:
          case HttpStatusCode.Unauthorized:
          case HttpStatusCode.InternalServerError:
          default:
            showSnackbar(error);
            return handleError(error);
        }
      })
    );
  }
}
