import { inject } from "@angular/core";
import { AuthService } from "../services";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(AuthService);
    if (authService.isLoggedIn()) {
        return true;
    }
    return false;
}