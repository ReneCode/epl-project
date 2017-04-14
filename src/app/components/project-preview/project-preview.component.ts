import { Component, OnInit, Input } from "@angular/core";

import { Project } from "../../models/Project";

@Component({
  selector: "epl-project-preview",
  templateUrl: "./project-preview.component.html",
  styleUrls: ["./project-preview.component.css"]
})
export class ProjectPreviewComponent implements OnInit {
  @Input() private project: Project;

  constructor() { }

  public ngOnInit() {
  }

}
