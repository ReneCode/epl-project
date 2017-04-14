import { Pipe, PipeTransform } from "@angular/core";

import { Project } from "../models/project";

@Pipe({
  name: "projectFilter",
  pure: false
})
export class ProjectFilterPipe implements PipeTransform {

  public transform(projects: Project[], args?: any): any {
    console.log(args);
    if (projects && args) {
      return projects.filter(project => project.name.includes(args));

    }
    return projects;
  }

}
