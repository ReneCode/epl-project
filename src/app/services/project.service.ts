import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Project } from "../models/project";

@Injectable()
export class ProjectService {
  private headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "*/*"
    };

  constructor(private http: Http) { }

  public getProjects(): Observable<Project[]> {

    const url = "https://cs2-projectmanagementservice-dev.azurewebsites.net/api/v1/projects";

    return this.http.get(url, this.headers)
      .map(this.mapProjects)
      .catch(err => Observable.throw(err));
  }

  public getProject(projectId: string): Observable<Project> {
    const url = `https://cs2-projectmanagementservice-dev.azurewebsites.net/api/v1/projects/${projectId}`;
    return this.http.get(url, this.headers)
      .map(this.mapProject)
      .catch(err => Observable.throw(err));
  }

  private mapProjects(res: Response): any {
    const json = res.json();
    const projects: Project[] = [];
    json.forEach(project => {
      projects.push(Project.createFromJson(project));
    });
    return projects;
  }

  private mapProject(res: Response): any {
    const json = res.json();
    const project: Project = Project.createFromJson(json);
    return project;
  }

  private handleError(err: Response) {
    console.error(err);
  }

}
