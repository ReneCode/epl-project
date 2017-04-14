import { Component, OnInit, Input } from "@angular/core";

import { Page } from "../../models/page";

@Component({
  selector: "epl-page-preview",
  templateUrl: "./page-preview.component.html",
  styleUrls: ["./page-preview.component.css"]
})
export class PagePreviewComponent implements OnInit {
  @Input() page: Page;

  constructor() { }

  ngOnInit() {
  }

}
