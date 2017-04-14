import { Component, OnInit, Input } from "@angular/core";

import { PageService } from "../../services/page.service";
import { Project } from "../../models/project";
import { Page } from "../../models/page";

@Component({
  selector: "epl-project-preview",
  templateUrl: "./project-preview.component.html",
  styleUrls: ["./project-preview.component.css"]
})
export class ProjectPreviewComponent implements OnInit {
  @Input() public project: Project;
  public pageUrl: string = undefined;
  public countPages: number;
  public removeSVGAttributes: string[] = ["id"];

  constructor(private pageService: PageService) { }

  public ngOnInit() {
    this.pageService.getPages(this.project.uniqueId)
      .subscribe( pages => {
        this.countPages = pages.length;

        if (pages.length > 0) {
          const projectId = this.project.uniqueId;
          const pageId = pages[0].sortId;
          this.pageUrl = `https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/${projectId}/svg/${pageId}.svg`;

        }

      });
  }

}
