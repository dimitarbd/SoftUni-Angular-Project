import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorService } from "../services/error.service";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorService = inject(ErrorService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unexpected error occurred.';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Client-side error: ${error.error.message}`;
            } else {
                // Server-side error
                errorMessage = `Server-side error: ${error.status} - ${error.error?.message || error.message}`;
            }

            errorService.setError(errorMessage);
            return throwError(() => error);
        }
    ));
}