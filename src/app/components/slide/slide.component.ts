import { Component, OnInit } from '@angular/core';
import { SlideService } from './../../services/slide.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { SlideStandard } from '../../models/StandardSlide';
import { CustomSlide } from '../../models/CustomSlide';
import { SlideAdminTemplate } from '../../models/SlideAdminTemplate';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  //validation
  customForm: FormGroup;
  standardSlideForm: FormGroup;


  //original file
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  //master file
  selectedMasterSlide: FileList;
  currentMasterSlideUpload: File;
  progressMasterSlide: { percentageMasterSlide: number } = { percentageMasterSlide: 0 };

  changeToSecond: string;
  changeToThird: string;
  bcolor: string = "null";
  fcolor: string = "null";
  footertext: string = "null";
  headertext: string = "null";
  numbering: string = "off";

  receviedTempales: SlideAdminTemplate[];

  families = [
    { value: 'Agency FB', viewValue: 'Agency FB' },
    { value: 'Arial', viewValue: 'Arial' },
    { value: 'Bauhaus', viewValue: 'Bauhaus' },
    { value: 'Benguiat Gothic', viewValue: 'Benguiat Gothic' },
    { value: 'Berlin Sans', viewValue: 'Berlin Sans' },
    { value: 'Calibri', viewValue: 'Calibri' },
    { value: 'Century Gothic', viewValue: 'Century Gothic' },
    { value: 'Comic Sans', viewValue: 'Comic Sans' },
    { value: 'Corbel', viewValue: 'Corbel' },
    { value: 'Eras', viewValue: 'Eras' },
    { value: 'Franklin Gothic', viewValue: 'Franklin Gothic' },
    { value: 'Gill Sans', viewValue: 'Gill Sans' },
    { value: 'Haettenschweiler', viewValue: 'Haettenschweiler' },
    { value: 'Impact', viewValue: 'Impact' },
    { value: 'Luci', viewValue: 'Luci' },
    { value: 'da Sans', viewValue: 'da Sans' },
    { value: 'Lucida Sans Unicode', viewValue: 'Lucida Sans Unicode' },
    { value: 'Modern', viewValue: 'Modern' },
    { value: 'MS Sans Serif', viewValue: 'MS Sans Serif' },
    { value: 'Segoe UI', viewValue: 'Segoe UI' },
    { value: 'Tahoma', viewValue: 'Tahoma' },
    { value: 'Trebuchet MS', viewValue: 'Trebuchet MS' },
    { value: 'Twentieth Century', viewValue: 'Twentieth Century' },
    { value: 'Verdana', viewValue: 'Verdana' }
  ];

  materials = [
    { value: 'slide', viewValue: 'Slide' },
    { value: 'tute', viewValue: 'Tutorial' },
    { value: 'lab', viewValue: 'Lab Sheet' }
  ];

  positions = [
    { value: 'left', viewValue: 'Left' },
    { value: 'center', viewValue: 'Center' },
    { value: 'right', viewValue: 'Right' }
  ];

  templates = [
    { value: 'standard', viewValue: 'Standard Template' },
    { value: 'custom', viewValue: 'Customizable Template' }
  ];

  //master file
  selectMasterSlide(event) {
    this.selectedMasterSlide = event.target.files;
  }

  onHeaderText(event) {
    console.log(event.target.value);
    this.headertext = event.target.value;
  }

  onFooterText(event) {
    console.log(event.target.value);
    this.footertext = event.target.value;
  }

  onBackcolor(event) {
    console.log(event.target.value);
    this.bcolor = event.target.value;
  }

  onNumbering(event) {
    console.log(event.target.value);
    this.numbering = event.target.value;
  }

  onFrontcolor(event) {
    console.log(event.target.value);
    this.fcolor = event.target.value;
  }



  uploadMasterSlide() {
    this.progressMasterSlide.percentageMasterSlide = 0;

    this.currentMasterSlideUpload = this.selectedMasterSlide.item(0);
    this.slideService.pushMasterSlideToStorage(this.currentMasterSlideUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressMasterSlide.percentageMasterSlide = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('Master Slide is completely uploaded!');
        this.changeToThird = "Change";
      }
    });

    this.selectedMasterSlide = undefined;
  }

  //original file
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload=undefined;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.slideService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('Original Slide is completely uploaded!');
        this.changeToSecond = "Change";
      }
    });

    this.selectedFiles = undefined;
  }

  permissionToReport: string;
  startStandardSlideValidation(audiance: number) {
    const newSlide: SlideStandard = new SlideStandard();
    newSlide.materialName = this.currentFileUpload.name;
    newSlide.masterFirstName = this.selectAdminTemp;
    //newSlide.masterFirstName = this.currentMasterSlideUpload.name;
    newSlide.masterSubName = "Default.ppt";
    newSlide.audianceSize = audiance;
    this.slideService.addSandardSlide(newSlide)
      .subscribe(insertedSlide => {
        console.log(insertedSlide);
        this.permissionToReport = "Okay";
      });
  }


  test(noofslide: number) {

    console.log(noofslide);

  }

  permissionToCustomReport: string;
  startCustomSlideValidation(noofslide: number,
    noofword: number, bullert: number, caudiance: number, fontfamily: string, position: string, header: string,
    footer: string) {

    const newSlide: CustomSlide = new CustomSlide();
    newSlide.noofslide = noofslide;
    newSlide.noofword = noofword;
    newSlide.bullert = bullert;
    newSlide.caudiance = caudiance;
    newSlide.fontfamily = fontfamily;
    newSlide.position = position;
    newSlide.header = header;
    newSlide.headertext = this.headertext;
    newSlide.footer = footer;
    newSlide.footertext = this.footertext;
    newSlide.numbering = this.numbering;
    newSlide.bcolorcheck = this.selectBColor;
    newSlide.bcolor = this.bcolor;
    newSlide.fcolorcheck = this.selectFColor;
    newSlide.fcolor = this.fcolor;
    newSlide.materialName = this.currentFileUpload.name;
    newSlide.masterFirstName = this.selectAdminTemp;
    //newSlide.masterFirstName = this.currentMasterSlideUpload.name;
    newSlide.masterSubName = "Default.ppt";


    this.slideService.addCustomSlide(newSlide)
      .subscribe(insertedSlide => {
        console.log(insertedSlide);
        this.permissionToCustomReport = "Okay";
      });

  }


  selectMaterial: string;
  onSelectMaterial(lectureMaterial: string): void {
    this.selectMaterial = lectureMaterial;
  }

  
  selectTempalte: string;
  onSelectTemplate(materialTempale: string): void {
    this.selectTempalte = materialTempale;
  }

  selectBColor: string;
  onbackColorCheck(event): void {

    if (this.selectBColor === 'on') {
      this.selectBColor = 'off';
    } else {
      this.selectBColor = event.target.value;
    }
  }

  restrictionColor: string;
  onColorRestriction(colorcheck: string): void {

    if (this.restrictionColor === 'on') {
      this.restrictionColor = 'off';
    } else {
      this.restrictionColor = colorcheck;
    }
  }

  selectFColor: string;
  onfrontColorCheck(event): void {

    if (this.selectFColor === 'on') {
      this.selectFColor = 'off';
    } else {
      this.selectFColor = event.target.value;
    }
  }

  selectHeader: string;
  onHeaderCheck(header: string): void {

    if (this.selectHeader === 'on') {
      this.selectHeader = 'off';
    } else {
      this.selectHeader = header;
    }
  }

  selectFooter: string;
  onFooterCheck(footer: string): void {

    if (this.selectFooter === 'on') {
      this.selectFooter = 'off';
    } else {
      this.selectFooter = footer;
    }
  }

  constructor(private frmbuilder: FormBuilder, private slideService: SlideService) {
    
    this.getAdminTemplatesFromDb();

    this.customForm = frmbuilder.group({
      noofslides: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
      noofwords: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
      noofbullerts: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
      audianceSize: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])]
    });


    this.standardSlideForm = frmbuilder.group({
      standardaudiancesize: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])]
    });

    
  }


  ngOnInit() {
    this.changeToSecond = "no Change";
    this.changeToThird = "no Change";
  }

    selectDocTempalte: string;
  onSelectDocTemplate(materialTempale: string): void {
    this.selectDocTempalte = materialTempale;
  }

selectDocHeader: string;
  onDocHeaderCheck(header: string): void {

    if (this.selectDocHeader === 'on') {
      this.selectDocHeader = 'off';
    } else {
      this.selectDocHeader = header;
    }
  }

  selectDocFooter: string;
  onDocFooterCheck(footer: string): void {

    if (this.selectDocFooter === 'on') {
      this.selectDocFooter = 'off';
    } else {
      this.selectDocFooter = footer;
    }
  }

  getAdminTemplatesFromDb(): void {
    this.receviedTempales=null;
    this.slideService.getAdminTemplates("sliit").subscribe(
      (updatedReport) => {

        this.receviedTempales = updatedReport;
      
      });
  }

  selectAdminTemp: string;
  onSelectAdminTemplate(adminTemplate: string): void {
    this.selectAdminTemp = adminTemplate;
  }

}
