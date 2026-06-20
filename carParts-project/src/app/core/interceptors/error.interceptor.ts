import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorService } from "../services/error.service";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorService = inject(ErrorService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const message = errorService.extractMessage(error);
            errorService.setError(message);
            return throwError(() => error);
        }
    ));
}