import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { ProjectService } from "./services/project.service";
import { PageService } from "./services/page.service";

import { AppComponent } from "./components/app/app.component";
import { SearchComponent } from "./components/search/search.component";
import { ProjectOverviewComponent } from "./components/project-overview/project-overview.component";
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { ProjectPreviewComponent } from "./components/project-preview/project-preview.component";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProjectOverviewComponent,
    MainHeaderComponent,
    ProjectPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ProjectService,
    PageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
