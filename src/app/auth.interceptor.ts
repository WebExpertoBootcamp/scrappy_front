import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
   next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  const router = inject(Router);
  if (authToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(request).pipe(
    catchError((error) => {
      const CODES_STATUS = [401, 403];

      if (CODES_STATUS.includes(error.status)) {
        authService.logOut();
        router.navigate(['/auth']);
      }

      return throwError(() => error);
    }),
  );
};


