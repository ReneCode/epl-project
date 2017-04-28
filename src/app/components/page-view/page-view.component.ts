import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { ProjectService } from "../../services/project.service";
import { PageService } from "../../services/page.service";
import { RedliningService } from "../../services/redlining.service";
import { Project } from "../../models/project";
import { Page } from "../../models/page";
import { Redlining } from "../../models/redlining";

@Component({
  selector: "epl-page-view",
  templateUrl: "./page-view.component.html",
  styleUrls: ["./page-view.component.css"]
})
export class PageViewComponent implements OnInit {
  public pageUrl: string;
  public redlinings: Redlining[];
  private projectName: string;
  private pageName: string;

  constructor(private pageService: PageService,
              private projectService: ProjectService,
              private redliningService: RedliningService,
              private activatedRoute: ActivatedRoute) { }

  public ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const projectId = params["projectid"];
        const pageId = params["pageid"];
        this.loadProjectName(projectId);
        this.loadPageName(projectId, pageId);
      });
  }

  public get title(): string {
    return this.projectName + " - " + this.pageName;
  }

  private loadProjectName(projectId: string) {
    this.projectService.getProject(projectId)
      .subscribe(project => {
        this.projectName = project.name;
      });
  }

  private loadPageName(projectId: string, pageId: string) {
    this.pageService.getPage(projectId, pageId)
      .subscribe(page => {
        this.pageUrl = `https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/${projectId}/svg/${page.sortId}.svg`;
        this.pageName = page.getName();

        this.loadRedlinings(projectId, page.tblObjectId);
      });
  }

  private loadRedlinings(projectId: string, tblObjectId: number) {
    this.redliningService.getRedlinings(projectId, tblObjectId)
      .subscribe(redlinings => {
        this.redlinings = redlinings;
      });
  }

}
