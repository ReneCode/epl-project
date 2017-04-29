import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import "rxjs/add/operator/filter";
import { environment } from "../../environments/environment";

import { tokenNotExpired } from "angular2-jwt";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  private redirectUrl: string = undefined;

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
      console.log("authenticated: ", authResult.idToken);
      localStorage.setItem("id_token", authResult.idToken);
      this.navigateToRedirect();
    });
  }

  public navigateToRedirect() {
    const redirectUrl = localStorage["redirect"];
    if (redirectUrl) {
      localStorage.removeItem("redirect");
      this.router.navigateByUrl(redirectUrl);
    }

  }


  public login(redirectUrl: string) {
    if (redirectUrl) {
      localStorage["redirect"] = redirectUrl;
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
  }
}
