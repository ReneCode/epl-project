import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "./services/auth-guard.service";

import { ProjectOverviewComponent } from "./components/project-overview/project-overview.component";
import { PageOverviewComponent } from "./components/page-overview/page-overview.component";
import { PagePreviewComponent } from "./components/page-preview/page-preview.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { PageViewComponent } from "./components/page-view/page-view.component";
import { RedirectComponent } from "./components/redirect/redirect.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "redirect", component: RedirectComponent },
  { path: "projects", component: ProjectOverviewComponent, canActivate: [AuthGuardService] },
  { path: "pages/:projectid", component: PageOverviewComponent, canActivate: [AuthGuardService] },
  { path: "page/:projectid/:pageid", component: PageViewComponent, canActivate: [AuthGuardService] },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
