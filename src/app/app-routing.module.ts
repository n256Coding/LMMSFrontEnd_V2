import { SlideComponent } from './components/slide/slide.component';
import { MoodleComponent } from './components/moodle/moodle.component';
import { VideoComponent } from './components/video/video.component';
import { TextComponent } from './components/text/text.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextRequestComponent } from './components/text-request/text-request.component';
import { MoodleResultComponent } from './components/moodle-result/moodle-result.component';

const routes: Routes = [
  { path : '', redirectTo : '/text-request', pathMatch : 'full' },
  { path : 'text-responce',  component : TextComponent },
  { path : 'text-request', component : TextRequestComponent },
  { path : 'video', component : VideoComponent },
  { path : 'moodle', component : MoodleComponent },
  { path : 'slide', component : SlideComponent },

  { path : '', redirectTo: '/moodle-result' ,pathMatch : 'full'},
  { path : 'moodle-result', component : MoodleResultComponent }
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
