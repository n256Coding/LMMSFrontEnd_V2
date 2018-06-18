import { DataService } from './services/data.service';
import { TextResourceService } from './services/text-resource.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeadComponent } from './components/head/head.component';
import { FootComponent } from './components/foot/foot.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { TextComponent } from './components/text/text.component';
import { VideoComponent, FilterDialog } from './components/video/video.component';
import { MoodleComponent } from './components/moodle/moodle.component';
import { SlideComponent } from './components/slide/slide.component';
import { TextResultComponent } from './components/text-result/text-result.component';
import { TextRequestComponent } from './components/text-request/text-request.component';

import { FilterService } from './components/video/filter-service';
import { MaterialModule } from './app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

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
    FilterDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [FilterDialog, VideoComponent],
  providers: [TextResourceService, DataService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
