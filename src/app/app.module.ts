import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule, Http, XHRBackend, RequestOptions } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";

import { InlineSVGModule } from "ng-inline-svg";

import { HttpInterceptor } from "./common/http-interceptor";

// import { AUTH_PROVIDERS } from "angular2-jwt";
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";

import { ProjectService } from "./services/project.service";
import { PageService } from "./services/page.service";
import { RedliningService } from "./services/redlining.service";

import { AppComponent } from "./components/app/app.component";
import { SearchComponent } from "./components/search/search.component";
import { ProjectOverviewComponent } from "./components/project-overview/project-overview.component";
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { ProjectPreviewComponent } from "./components/project-preview/project-preview.component";
import { PageOverviewComponent } from "./components/page-overview/page-overview.component";
import { PagePreviewComponent } from "./components/page-preview/page-preview.component";
import { ProjectFilterPipe } from "./pipes/project-filter.pipe";
import { PageFilterPipe } from "./pipes/page-filter.pipe";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { PageViewComponent } from "./components/page-view/page-view.component";
import { RedirectComponent } from "./components/redirect/redirect.component";
import { HomeComponent } from "./components/home/home.component";
import { SvgTransformGroupDirective } from "./directives/svg-transform-group.directive";
import { MouseWheelDirective } from "./directives/mouse-wheel.directive";

export function factoryHttpInterceptor(backend: XHRBackend, defaultOptions: RequestOptions, authService: AuthService)  {
    return new HttpInterceptor(backend, defaultOptions, authService);
};

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProjectOverviewComponent,
    MainHeaderComponent,
    ProjectPreviewComponent,
    PageOverviewComponent,
    PagePreviewComponent,
    ProjectFilterPipe,
    PageFilterPipe,
    PageNotFoundComponent,
    PageViewComponent,
    RedirectComponent,
    HomeComponent,
    SvgTransformGroupDirective,
    MouseWheelDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InlineSVGModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: Http,
      // useClass: HttpInterceptor,
      useFactory: (factoryHttpInterceptor),
      deps: [XHRBackend, RequestOptions, AuthService]
    },
    // AUTH_PROVIDERS,
    ProjectService,
    PageService,
    RedliningService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
