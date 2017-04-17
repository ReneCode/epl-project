import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "epl-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.css"]
})
export class MainHeaderComponent implements OnInit {
  @Input() public title: string = "";

  constructor() { }

  public ngOnInit() {
  }

}
