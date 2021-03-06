import { Pipe, PipeTransform } from "@angular/core";

import { Project } from "../models/project";

@Pipe({
  name: "projectFilter"
  // pure: false
})
export class ProjectFilterPipe implements PipeTransform {

  public transform(projects: Project[], args?: string): any {
    if (projects && args) {
      const upperFilter = args.toUpperCase();
      return projects.filter(project => {
        if (project.name) {
          return project.name.toUpperCase().includes(upperFilter);
        }
        return false;
      });
    }
    return projects;
  }

}
