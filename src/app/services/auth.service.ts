import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import "rxjs/add/operator/filter";
import { environment } from "../../environments/environment";

import { tokenNotExpired } from "angular2-jwt";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  public userProfile: any;

  private lock: any = new Auth0Lock("uQ5ASdbVcuUaRjTSaRwKKMK40gjl44fp",
    "relang.eu.auth0.com",
    // always redirect to the same url.
    {
      auth: {
        redirectUrl: environment.redirectUrl,
        responseType: "token"
      }
    });

  constructor(private router: Router) {
    try {
      this.userProfile = JSON.parse(localStorage["userProfile"]);

    } catch (e) { }

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem("id_token", authResult.idToken);
      // console.log("## auth:", authResult.idToken);
      this.lock.getProfile(authResult.idToken, (err, profile) => {
        this.userProfile = profile;
        localStorage["userProfile"] = JSON.stringify(profile);

        this.navigateToRedirect();
      });

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
    localStorage.removeItem("userProfile");

    this.userProfile = undefined;
    this.router.navigate([""]);
  }

  public userName() {
    if (!this.authenticated() && this.userProfile) {
      return `${this.userProfile.name} / ${this.tenantId()}`;
    }
    return undefined;
  }

  public tenantId(): string {
    if (this.authenticated() && this.userProfile && this.userProfile.user_metadata) {
      return this.userProfile.user_metadata.tenantId;
    }
    return "";
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
