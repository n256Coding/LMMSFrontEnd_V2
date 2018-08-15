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
import {AdminTemplateComponent} from './components/admin-template/admin-template.component';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import { RegisterComponent } from './components/register/register.component';
import { MoodleResultComponent } from './components/moodle-result/moodle-result.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MoodleQuizResultsComponent} from './components/moodle-quiz-results/moodle-quiz-results.component';

const routes: Routes = [
  { path : '', redirectTo : '/home', pathMatch : 'full' },
  { path : 'text-responce',  component : TextComponent },
  { path : 'text-request', component : TextRequestComponent },
  { path : 'video', component : VideoComponent },
  { path : 'video/processing', component : ProcessingComponent },
  { path : 'moodle', component : MoodleComponent },
  { path : 'moodle-result', component : MoodleResultComponent },
  { path : 'moodle-quiz-results', component : MoodleQuizResultsComponent },
  { path : 'slide', component : SlideComponent },
  { path : 'report', component : SlideStandardReportComponent },
  { path : 'customReportSlide', component : SlideCustomReportComponent },
  { path : 'adminTemplate',component: AdminTemplateComponent},
  { path : 'loginPage', component : LoginComponent },
  { path : 'home', component : HomeComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'about',component: AboutComponent },
  { path : 'contact', component : ContactComponent }
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
