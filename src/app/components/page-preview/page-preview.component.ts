import { Component, OnInit, Input } from "@angular/core";
import { environment } from "../../../environments/environment";

import { Page } from "../../models/page";

@Component({
  selector: "epl-page-preview",
  templateUrl: "./page-preview.component.html",
  styleUrls: ["./page-preview.component.css"]
})
export class PagePreviewComponent implements OnInit {
  public pageUrl: string = undefined;
  public removeSVGAttributes: string[] = ["id"];
  public pageName: string;

  @Input() private page: Page;

  constructor() { }

  public ngOnInit() {
    const projectId = this.page.projectId;
    const pageId = this.page.sortId;
    this.pageUrl = `https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/${projectId}/svg/${pageId}.svg`;
    this.pageName = this.page.getName();
  }
}
