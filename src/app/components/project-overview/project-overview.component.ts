import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ProjectService } from "../../services/project.service";
import { Project } from "../../models/project";

@Component({
  selector: "epl-project-overview",
  templateUrl: "./project-overview.component.html",
  styleUrls: ["./project-overview.component.css"]
})
export class ProjectOverviewComponent implements OnInit {
  public projects: Project[];
  public searchValue: string = "";

  constructor(private projectService: ProjectService,
              private router: Router) { }

  public ngOnInit() {
    this.projectService.getProjects()
      .subscribe( projects => {
        this.projects = [ projects[3], projects[3]  ];
        this.projects = projects;
      });
  }

  public onSearch(value: string) {
    this.searchValue = value;
  }

  private onSelectProject(project: Project) {
    this.router.navigate(["/pages", project.id]);
  }

}
