import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService,
    private router: Router,
  ) { }

  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return true
    //this.userService.valideToken()
    // .pipe(
    // tap(isAuthenticated => {
    //  if (!isAuthenticated) {
    //  this.router.navigateByUrl('/login');
    // }
    //  })
    // );
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (!this.userService.valideToken()) {
      this.router.navigateByUrl('/login');
    }

    return this.userService.valideToken();
  }

}
