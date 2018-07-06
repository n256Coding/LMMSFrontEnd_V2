import { Component, OnInit } from '@angular/core';
import { SlideService } from './../../services/slide.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { SlideStandard } from '../../models/StandardSlide';
import { CustomSlide } from '../../models/CustomSlide';
import { SlideAdminTemplate } from '../../models/SlideAdminTemplate';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  adminForm: FormGroup;

  //master file
  selectedMasterSlide: FileList = undefined;
  currentMasterSlideUpload: File;
  progressMasterSlide: { percentageMasterSlide: number } = { percentageMasterSlide: 0 };


  constructor(private frmbuilder: FormBuilder, private slideService: SlideService) {
    this.adminForm = frmbuilder.group({
      templateName: ['', Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
  }

  selectMasterSlide(event) {
    this.selectedMasterSlide = event.target.files;
    this.currentMasterSlideUpload = undefined;
  }

  uploadMasterSlide() {
    this.progressMasterSlide.percentageMasterSlide = 0;

    this.currentMasterSlideUpload = this.selectedMasterSlide.item(0);
    this.slideService.pushMasterSlideToStorage(this.currentMasterSlideUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressMasterSlide.percentageMasterSlide = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('Master Slide is completely uploaded!');

      }
    });



    this.selectedMasterSlide = undefined;
  }


  admin(tempName: string): void {

    this.uploadMasterSlide();

    const template: SlideAdminTemplate = new SlideAdminTemplate();
    template.name = tempName;
    template.actualName = this.currentMasterSlideUpload.name;
    template.university = "sliit";
    this.slideService.addAdminTemplate(template)
      .subscribe(insertedTemp => {
        console.log(insertedTemp);
        alert("Your File Successfully uploaded!");
        this.currentMasterSlideUpload=undefined;
      });
  }

}
