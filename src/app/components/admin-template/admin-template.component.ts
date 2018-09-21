import { Component, OnInit } from '@angular/core';
import { SlideService } from './../../services/slide.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { SlideStandard } from '../../models/StandardSlide';
import { CustomSlide } from '../../models/CustomSlide';
import { SlideAdminTemplate } from '../../models/SlideAdminTemplate';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Location } from '@angular/common';

declare var $: any;

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

  materials = [
    { value: 'slide', viewValue: 'Slide' },
    { value: 'tute', viewValue: 'Tutorial' },
    { value: 'lab', viewValue: 'Lab Sheet' }
  ];

  constructor(private frmbuilder: FormBuilder, private slideService: SlideService, private location: Location) {
    this.adminForm = frmbuilder.group({
      templateName: ['', Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
  }

  selectMaterial: string;
  onSelectMaterial(lectureMaterial: string): void {
    this.selectMaterial = lectureMaterial;
  }

  selectMasterSlide(event) {
    this.selectedMasterSlide = event.target.files;
    this.currentMasterSlideUpload = undefined;
  }

  uploadMasterSlide(tempName: string) {
    this.progressMasterSlide.percentageMasterSlide = 0;

    this.currentMasterSlideUpload = this.selectedMasterSlide.item(0);

    if ((this.currentMasterSlideUpload.type === "application/vnd.ms-powerpoint")  ||
      (this.currentMasterSlideUpload.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") ) {


      this.slideService.pushMasterSlideToStorage(this.currentMasterSlideUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressMasterSlide.percentageMasterSlide = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('Master Slide is completely uploaded!');
          $('#adminLoadingModal').modal('hide');

          const template: SlideAdminTemplate = new SlideAdminTemplate();
          template.name = tempName;
          template.actualName = this.currentMasterSlideUpload.name;
          template.university = "sliit";
          this.slideService.addAdminTemplate(template)
            .subscribe(insertedTemp => {
              console.log(insertedTemp);
              $('#adminLoadingModal').modal('hide');
              $('#adminTemplateUploadingModal').modal('show');
              //alert("Your File Successfully uploaded!");
              this.currentMasterSlideUpload = undefined;
            });

        }
      });


    } else {

      $('#adminTemplateUploadingFailModal').modal('show');
    }
    this.selectedMasterSlide = undefined;
  }

  receviedTempales: SlideAdminTemplate[];
  checkTempales: SlideAdminTemplate[];
  admin(tempName: string): void {


    this.slideService.checkAdminSlideTemplates(tempName).subscribe(
      (updatedReport) => {
        this.receviedTempales = updatedReport;

        if ((Object.keys(this.receviedTempales).length === 0)) {

          this.slideService.checkSlideTemplates(this.selectedMasterSlide.item(0).name).subscribe(
            (updatedReport) => {
              this.checkTempales = updatedReport;

              if ((Object.keys(this.checkTempales).length === 0)) {
                $('#adminLoadingModal').modal('show');
                this.uploadMasterSlide(tempName);
              } else {
                $('#adminTemplateUploadingExistModal').modal('show');
              }

            });

        } else {
          $('#adminTemplateUploadingExistModal').modal('show');
        }

      });

  }


  receviedDocTempales: SlideAdminTemplate[];
  adminDoc(tempName: string): void {


    this.slideService.checkAdminDocTemplates(tempName).subscribe(
      (updatedReport) => {
        this.receviedDocTempales = updatedReport;

        if ((Object.keys(this.receviedDocTempales).length === 0)) {


          this.slideService.checkDocTemplates(this.selectedMasterSlide.item(0).name).subscribe(
            (updatedReport) => {
              this.checkTempales = updatedReport;

              if ((Object.keys(this.checkTempales).length === 0)) {
                 $('#adminLoadingModal').modal('show');
          this.uploadMasterDoc(tempName);
              } else {
                $('#adminTemplateUploadingExistModal').modal('show');
              }

            });


       

        } else {
          $('#adminTemplateUploadingExistModal').modal('show');
        }

      });


  }

  uploadMasterDoc(tempName: string) {
    this.progressMasterSlide.percentageMasterSlide = 0;

    this.currentMasterSlideUpload = this.selectedMasterSlide.item(0);
    if ( (this.currentMasterSlideUpload.type === "application/msword") || 
      (this.currentMasterSlideUpload.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {

      this.slideService.pushMasterDocToStorage(this.selectedMasterSlide).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressMasterSlide.percentageMasterSlide = Math.round(100 * event.loaded / event.total);

        } else if (event instanceof HttpResponse) {
          console.log('Master Doc is completely uploaded!');
          $('#adminLoadingModal').modal('hide');

          const template: SlideAdminTemplate = new SlideAdminTemplate();
          template.name = tempName;
          template.actualName = this.currentMasterSlideUpload.name;
          template.university = "sliit";
          this.slideService.addAdminDocTemplate(template)
            .subscribe(insertedTemp => {
              console.log(insertedTemp);
              $('#adminLoadingModal').modal('hide');
              $('#adminTemplateUploadingModal').modal('show');

              // alert("Your File Successfully uploaded!");
              this.currentMasterSlideUpload = undefined;
            });
        }
      });

    } else {

      $('#adminTemplateUploadingFailModal').modal('show');
    }
    this.selectedMasterSlide = undefined;
  }

  pageRefresh() {
    location.reload();
  }

}
