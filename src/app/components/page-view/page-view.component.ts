import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { ProjectService } from "../../services/project.service";
import { PageService } from "../../services/page.service";
import { RedliningService } from "../../services/redlining.service";
import { Project } from "../../models/project";
import { Page } from "../../models/page";
import { Redlining } from "../../models/redlining";

import { SvgTransformer } from "../../common/svg-transformer";
import { SvgTransformGroupDirective } from "../../directives/svg-transform-group.directive";

@Component({
  selector: "epl-page-view",
  templateUrl: "./page-view.component.html",
  styleUrls: ["./page-view.component.scss"]
})
export class PageViewComponent implements OnInit {
  @ViewChild("svgTransformGroup") public svgTransformGroup: SvgTransformGroupDirective;

  public pageUrl: string;
  public redlinings: Redlining[];
  private projectName: string;
  private pageName: string;
  private svgTransformer: SvgTransformer;

  constructor(
    private pageService: PageService,
    private projectService: ProjectService,
    private redliningService: RedliningService,
    private activatedRoute: ActivatedRoute) { }

  public ngOnInit() {
    const svg = document.querySelector("svg");
    this.svgTransformer = new SvgTransformer(svg, this.svgTransformGroup);

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

  public mouseWheelUp(event: Event) {
    this.svgTransformer.zoomOut(event);
  }

  public mouseWheelDown(event: Event) {
    this.svgTransformer.zoomIn(event);
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
