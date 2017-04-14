import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../services/project.service";
import { Project } from "../../models/project";

@Component({
  selector: "epl-project-overview",
  templateUrl: "./project-overview.component.html",
  styleUrls: ["./project-overview.component.css"]
})
export class ProjectOverviewComponent implements OnInit {
  private projects: Project[];

  constructor(private projectService: ProjectService) { }

  public ngOnInit() {
    this.projectService.getProjects()
      .subscribe( projects => this.projects = projects);
  }

}
