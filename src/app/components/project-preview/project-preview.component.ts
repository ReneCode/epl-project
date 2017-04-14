import { Component, OnInit, Input } from "@angular/core";

import { PageService } from "../../services/page.service";
import { Project } from "../../models/Project";
import { Page } from "../../models/Page";

@Component({
  selector: "epl-project-preview",
  templateUrl: "./project-preview.component.html",
  styleUrls: ["./project-preview.component.css"]
})
export class ProjectPreviewComponent implements OnInit {
  @Input() private project: Project;
  private countPages: number;

  constructor(private pageService: PageService) { }

  public ngOnInit() {
    this.pageService.getPages(this.project)
      .subscribe( pages => {
        this.countPages = pages.length;
      });
  }

}
