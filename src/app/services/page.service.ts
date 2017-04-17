import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Project } from "../models/project";
import { Page } from "../models/page";

@Injectable()
export class PageService {
  private headers: object = {
    "Content-Type": "application/json; charset=UTF-8",
    "Accept": "*/*"
  };

  constructor(private http: Http) { }

  public getPages(projectId: string): Observable<Page[]> {
    const url = `https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/${projectId}/pages`;

    return this.http.get(url, this.headers)
      .map(this.mapPages)
      .catch(err => Observable.throw(err));
  }

  public getPage(projectId: string, pageId: string): Observable<Page> {
    const url = `https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/${projectId}/pages/${pageId}`;

    return this.http.get(url, this.headers)
      .map(this.mapPage)
      .catch(err => Observable.throw(err));

  }

  private mapPages(res: Response): Page[] {
    const json = res.json();
    const pages: Page[] = [];
    json.forEach(page => {
      pages.push(Page.createFromJson(page));
    });
    return pages;
  }


  private mapPage(res: Response): Page {
    const json = res.json();
    if (json) {
      return Page.createFromJson(json);
    }
    return null;
  }


  private handleError(err: Response) {
    console.error(err);
  }
}
