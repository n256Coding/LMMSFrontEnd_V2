import { UserSessionService } from './services/user-session.service';
import { DataService } from './services/data.service';
import { TextResourceService } from './services/text-resource.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from "bootstrap";

import { AppComponent } from './app.component';
import { HeadComponent } from './components/head/head.component';
import { FootComponent } from './components/foot/foot.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TextComponent } from './components/text/text.component';
import { VideoComponent } from './components/video/video.component';
import { MoodleComponent } from './components/moodle/moodle.component';
import { TextResultComponent } from './components/text-result/text-result.component';
import { TextRequestComponent } from './components/text-request/text-request.component';

//slide
import { SlideComponent } from './components/slide/slide.component';
import { SlideStandardReportComponent } from './components/slide-standard-report/slide-standard-report.component';
import { SlideCustomReportComponent } from './components/slide-custom-report/slide-custom-report.component';



import { MaterialModule } from './app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { ListItemComponent } from './components/video/list-item/list-item.component';
import { HttpModule } from '@angular/http';
import { FilterDialog } from "./components/video/filter-dialog/filter-dialog.component";
import { videoService } from './services/video-service';
import { ProcessingComponent } from './components/video/processing/processing.component';

//enableProdMode();
import { MoodleService } from './services/moodle.service';
import { LoginComponent } from './components/login/login.component';
import {WebStorageService, SESSION_STORAGE, StorageServiceModule} from "angular-webstorage-service";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FootComponent,
    TextComponent,
    VideoComponent,
    MoodleComponent,
    SlideComponent,
    TextResultComponent,
    TextRequestComponent,
    FilterDialog,
    ListItemComponent,
    ProcessingComponent,
    TextRequestComponent,
    SlideStandardReportComponent,
    SlideCustomReportComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BarRatingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    StorageServiceModule
  ],
  entryComponents: [FilterDialog, VideoComponent, ListItemComponent, ProcessingComponent],
  providers: [TextResourceService, DataService, UserSessionService, videoService, MoodleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
