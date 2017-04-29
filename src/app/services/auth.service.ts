import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import "rxjs/add/operator/filter";
import { environment } from "../../environments/environment";

import { tokenNotExpired } from "angular2-jwt";

declare var Auth0Lock: any;




@Injectable()
export class AuthService {

  private lock: any = new Auth0Lock("uQ5ASdbVcuUaRjTSaRwKKMK40gjl44fp",
    "relang.eu.auth0.com",
    {
      auth: {
        redirectUrl: environment.redirectUrl,
        responseType: "token"
      }
    });

  constructor(private router: Router) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem("id_token", authResult.idToken);
      this.navigateToRedirect();
    });
  }

  public navigateToRedirect() {
    const redirectUrl = this.getRedirectUrl();
    // console.log("redirect:", redirectUrl);
    if (redirectUrl != undefined) {
      this.clearRedirectUrl();
      this.router.navigateByUrl(redirectUrl);
    }
  }


  public login(redirectUrl: string) {
    // console.log("login:", redirectUrl)

    if (redirectUrl != undefined) {
      this.setRedirectUrl(redirectUrl);
    }
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired("id_token");
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem("id_token");
    this.router.navigate([""]);
  }

  private setRedirectUrl(redirectUrl: string) {
    localStorage["redirectUrl"] = redirectUrl;
  };


  private clearRedirectUrl() {
    localStorage.removeItem("redirectUrl");
  };

  private getRedirectUrl(): string {
    return localStorage["redirectUrl"];
  };

}
