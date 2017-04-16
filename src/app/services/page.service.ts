import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Project } from "../models/project";
import { Page } from "../models/page";

@Injectable()
export class PageService {

  constructor(private http: Http) { }

  public getPages(projectId: string): Observable<Page[]> {
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "*/*"
    };
    const url = `https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/${projectId}/pages`;

    return this.http.get(url, headers)
      .map(this.mapProjects)
      .catch(err => Observable.throw(err));
  }

  private mapProjects(res: Response): Page[] {
    const json = res.json();
    const pages: Page[] = [];
    json.forEach(page => {
      pages.push(Page.createFromJson(page));
    });
    return pages;
  }

  private handleError(err: Response) {
    console.error(err);
  }
}
