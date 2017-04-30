import { Component, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "epl-redirect",
  templateUrl: "./redirect.component.html",
  styleUrls: ["./redirect.component.scss"]
})
export class RedirectComponent implements AfterViewInit {

  constructor(private auth: AuthService, private router: Router) { }

  public ngAfterViewInit() {
    const func = () => {
      this.auth.navigateToRedirect();
    };
    setTimeout(func, 500);
  }


}

