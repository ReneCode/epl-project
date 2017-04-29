import { Injectable } from "@angular/core";
import { Http, ConnectionBackend, Request, Response, RequestOptions, RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { AuthService } from "./services/auth.service";

import { environment } from "../environments/environment";

@Injectable()
export class HttpInterceptor extends Http {
    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                private authService: AuthService) {
        super(backend, defaultOptions);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let headers: Headers = null;
        if (!options) {
            const requestOptionArgs: RequestOptionsArgs = url as RequestOptionsArgs;
            if (requestOptionArgs) {
                headers = requestOptionArgs.headers;
            }
        } else {
            headers = options.headers;
        }

        if (headers) {
            headers.set("tenantId", this.authService.tenantId());
        }

        return super.request(url, options);
    }


}