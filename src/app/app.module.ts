import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";

import { InlineSVGModule } from "ng-inline-svg";

import { ProjectService } from "./services/project.service";
import { PageService } from "./services/page.service";

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

const appRoutes: Routes = [
  { path: "", redirectTo: "/projects",  pathMatch: "full" },
  { path: "projects", component: ProjectOverviewComponent },
  { path: "pages/:projectid", component: PageOverviewComponent },
  { path: "page/:projectid/:pageid", component: PageViewComponent },
  // { path: "hero/:id",      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  { path: "**", component: PageNotFoundComponent }
];

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
    PageViewComponent
  ],
  imports: [
      RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    InlineSVGModule
  ],
  providers: [
    ProjectService,
    PageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
