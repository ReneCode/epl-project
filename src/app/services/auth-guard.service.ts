import { Injectable } from "@angular/core";
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url);
  }

  private checkLogin(redirectUrl: string): boolean {
    if (this.authService.authenticated()) {
      return true;
    }

    this.authService.login(redirectUrl);
    return false;
  }
}
