import { DataService } from './services/data.service';
import { TextResourceService } from './services/text-resource.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeadComponent } from './components/head/head.component';
import { FootComponent } from './components/foot/foot.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { TextComponent } from './components/text/text.component';
import { VideoComponent } from './components/video/video.component';
import { MoodleComponent } from './components/moodle/moodle.component';
import { SlideComponent } from './components/slide/slide.component';
import { TextResultComponent } from './components/text-result/text-result.component';
import { TextRequestComponent } from './components/text-request/text-request.component';

import { MaterialModule } from './app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { ListItemComponent } from './components/video/list-item/list-item.component';
import { HttpModule } from '@angular/http';
import { FilterDialog } from "./components/video/filter-dialog/filter-dialog.component";
import { videoService } from './services/video-service';

//enableProdMode();

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
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  entryComponents: [FilterDialog, VideoComponent, ListItemComponent],
  providers: [TextResourceService, DataService, videoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
