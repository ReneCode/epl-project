import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { PageService } from "../../services/page.service";
import { Project } from "../../models/project";
import { Page } from "../../models/page";

@Component({
  selector: "epl-page-overview",
  templateUrl: "./page-overview.component.html",
  styleUrls: ["./page-overview.component.css"]
})
export class PageOverviewComponent implements OnInit {
  private pages: Page[];

  constructor(private pageService: PageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  public ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const projectId = params["projectid"];
        this.loadPages(projectId);

      });
  }

  private loadPages(projectId: string) {
    this.pageService.getPages(projectId)
      .subscribe(pages => {
        this.pages = pages;
      });
  }

  private onSelectPage(page: Page) {
      this.router.navigate(["/pages", page.projectId, page.sortId]);
  }
}

