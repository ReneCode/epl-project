import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "epl-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.css"]
})
export class MainHeaderComponent implements OnInit {
  @Input() public title: string = "";

  constructor(private auth: AuthService) {
  }

  public ngOnInit() {
  }

}
