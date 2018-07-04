import { SlideComponent } from './components/slide/slide.component';
import { MoodleComponent } from './components/moodle/moodle.component';
import { VideoComponent } from './components/video/video.component';
import { TextComponent } from './components/text/text.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextRequestComponent } from './components/text-request/text-request.component';
import { ProcessingComponent } from './components/video/processing/processing.component';

import {SlideStandardReportComponent} from './components/slide-standard-report/slide-standard-report.component';
import {SlideCustomReportComponent} from './components/slide-custom-report/slide-custom-report.component';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path : '', redirectTo : '/home', pathMatch : 'full' },
  { path : 'text-responce',  component : TextComponent },
  { path : 'text-request', component : TextRequestComponent },
  { path : 'video', component : VideoComponent },
  { path : 'video/processing', component : ProcessingComponent },
  { path : 'moodle', component : MoodleComponent },
  { path : 'slide', component : SlideComponent },
  { path : 'report', component : SlideStandardReportComponent },
  { path : 'customReportSlide', component : SlideCustomReportComponent },
  { path : 'loginPage', component : LoginComponent },
  { path : 'home', component : HomeComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports : [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
