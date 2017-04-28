import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Redlining } from "../models/redlining";

@Injectable()
export class RedliningService {
  private headers: object = {
    "Content-Type": "application/json; charset=UTF-8",
    "Accept": "*/*"
  };

  constructor(private http: Http) { }

  public getRedlinings(projectId: string, pageTblObjectId: number): Observable<Redlining[]> {
    const url = `https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/${projectId}/redlining`;

    return this.http.get(url, this.headers)
      .map( res => this.mapRedlinings(res, pageTblObjectId))
      .catch(err => Observable.throw(err));
  }

  private mapRedlinings(res: Response, pageTblObjectId: number): Redlining[] {
    const json = res.json();
    const redlinings: Redlining[] = [];
    json.forEach(redlining => {
      if (redlining.pageTblObjectId === pageTblObjectId) {
        redlinings.push(Redlining.createFromJson(redlining));
      }
    });
    return redlinings;
  }

  private handleError(err: Response) {
    console.error(err);
  }
}
