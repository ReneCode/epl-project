import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Project } from "../models/project";

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  public getProjects(): Observable<Project[]> {

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "*/*"
    };
    const url = "https://cs2-projectmanagementservice-dev.azurewebsites.net/api/v1/projects";

    return this.http.get(url, headers)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }

  private mapProjects(res: Response): any {
    const result = res.json();
    return result;
  }

  private handleError(err: Response) {
    console.error(err);
  }

}
