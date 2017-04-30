import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ProjectService } from "../../services/project.service";
import { PageService } from "../../services/page.service";
import { Project } from "../../models/project";
import { Page } from "../../models/page";

@Component({
  selector: "epl-page-overview",
  templateUrl: "./page-overview.component.html",
  styleUrls: ["./page-overview.component.scss"]
})
export class PageOverviewComponent implements OnInit {
  public pages: Page[];
  public searchValue: string;
  public projectName: string = "";

  constructor(
    private pageService: PageService,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const projectId = params["projectid"];
        this.loadProjectName(projectId);
        this.loadPages(projectId);

      });
  }

  public onSearch(searchValue: string) {
    this.searchValue = searchValue;
  }

  private loadProjectName(projectId: string) {
    this.projectService.getProject(projectId)
      .subscribe(project => {
        if (project) {
          this.projectName = project.name;
        }
      });
  }

  private loadPages(projectId: string) {
    this.pageService.getPages(projectId)
      .subscribe(pages => {
        this.pages = pages;
      });
  }

  private onSelectPage(page: Page) {
    this.router.navigate(["/page", page.projectId, page.id]);
  }
}
