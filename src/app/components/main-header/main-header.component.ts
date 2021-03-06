import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "epl-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.scss"]
})
export class MainHeaderComponent implements OnInit {
  @Input() public title: string = "";

  constructor(public auth: AuthService) {
  }

  public ngOnInit() {
  }

  public login() {
    this.auth.login("");
  }

  public logout() {
    this.auth.logout();
  }
}
