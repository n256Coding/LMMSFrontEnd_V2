import { DataService } from './services/data.service';
import { TextResourceService } from './services/text-resource.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';
import { FormsModule } from '@angular/forms';


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

import { MoodleService } from './services/moodle.service';
import { MoodleResultComponent } from './components/moodle-result/moodle-result.component';
import { MoodleResultService } from './services/moodle-result.service';
import { MoodleQuizService } from './services/moodle-quiz.service';
import { MoodleQuizResultsComponent } from './components/moodle-quiz-results/moodle-quiz-results.component';

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
    MoodleResultComponent,
    MoodleQuizResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BarRatingModule,
    FormsModule
  ],
  providers: [TextResourceService, DataService, MoodleService, MoodleResultService, MoodleQuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
