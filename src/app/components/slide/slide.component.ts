import { Component, OnInit } from '@angular/core';
import { SlideService } from './../../services/slide.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { SlideStandard } from '../../models/StandardSlide';
import { CustomSlide } from '../../models/CustomSlide';
import { SlideAdminTemplate } from '../../models/SlideAdminTemplate';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { StandardDoc } from '../../models/StandardDoc';
import { CustomDoc } from '../../models/CustomDoc';
import { DocReport } from '../../models/DocReport';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  //validation
  customForm: FormGroup;
  standardSlideForm: FormGroup;


  //ppt file
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  //doc file
  selectedDocFiles: FileList;
  currentDocFileUpload: File;
  docProgress: { docPercentage: number } = { docPercentage: 0 };

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

  wordFamilies = [
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
    { value: 'Verdana', viewValue: 'Verdana' },

    { value: 'Adobe Jenson', viewValue: 'Adobe Jenson' },
    { value: 'Albertus', viewValue: 'Albertus' },
    { value: 'Aldus', viewValue: 'Aldus' },
    { value: 'Alexandria', viewValue: 'Alexandria' },
    { value: 'American Typewriter', viewValue: 'American Typewriter' },
    { value: 'Archer', viewValue: 'Archer' },
    { value: 'Arno', viewValue: 'Arno' },
    { value: 'Aster', viewValue: 'Aster' },
    { value: 'Baskerville', viewValue: 'Baskerville' },
    { value: 'Bell', viewValue: 'Bell' },
    { value: 'Bodoni', viewValue: 'Bodoni' },
    { value: 'Caledonia', viewValue: 'Caledonia' },
    { value: 'Calisto', viewValue: 'Calisto' },
    { value: 'Cambria', viewValue: 'Cambria' },
    { value: 'Caslon', viewValue: 'Caslon' },
    { value: 'Centaur', viewValue: 'Centaur' },
    { value: 'Century Schoolbook', viewValue: 'Century Schoolbook' },
    { value: 'Droid', viewValue: 'Droid' },
    { value: 'Droid Serif Pro', viewValue: 'Droid Serif Pro' },
    { value: 'Palatino', viewValue: 'Palatino' },
    { value: 'Sabon', viewValue: 'Sabon' },
    { value: 'Mrs Eaves', viewValue: 'Mrs Eaves' },
    { value: 'Georgia', viewValue: 'Georgia' },
    { value: 'Times New Roman', viewValue: 'Times New Roman' },
    { value: 'Trajan', viewValue: 'Trajan' },
    { value: 'Warnock', viewValue: 'Warnock' }
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

  filespath: string;
  //original file
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.filespath = event.target.files.name;
    this.currentFileUpload = undefined;

  }

  upload() {
    //  $('#slideDocLoadingModal').modal('show');
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    if ((this.currentFileUpload.type === "application/vnd.ms-powerpoint") /* ||
      (this.currentFileUpload.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") */) {

      this.slideService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('Original Slide is completely uploaded!');
          this.changeToSecond = "Change";
        //   $('#slideDocLoadingModal').modal('hide');
        }

      });
    } else {
      $('#slideTemplateUploadingFailModal').modal('show');

    }

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
    newSlide.header = null;
    newSlide.headertext = null;
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
    this.getAdminTemplatesFromDb();
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

  constructor(private frmbuilder: FormBuilder, private slideService: SlideService, private location: Location) {



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

  selectDocHeader: string = 'off';
  onDocHeaderCheck(header: string): void {

    if (this.selectDocHeader === 'on') {
      this.selectDocHeader = 'off';
    } else {
      this.selectDocHeader = header;
    }
  }

  selectDocFooter: string = 'off';
  onDocFooterCheck(footer: string): void {

    if (this.selectDocFooter === 'on') {
      this.selectDocFooter = 'off';
    } else {
      this.selectDocFooter = footer;
    }
  }

  selectDocNum: string;
  onDocNumberingCheck(Num: string): void {

    if (this.selectDocNum === 'on') {
      this.selectDocNum = 'off';
    } else {
      this.selectDocNum = Num;
    }
  }

  getAdminTemplatesFromDb(): void {
    this.receviedTempales = null;

    if (this.selectMaterial == 'slide') {

      this.slideService.getAdminTemplates("sliit").subscribe(
        (updatedReport) => {
          this.receviedTempales = updatedReport;
        });
      console.log(this.receviedTempales);
    } else {

      this.slideService.getAdminDocTemplates("sliit").subscribe(
        (updatedReport) => {
          this.receviedTempales = updatedReport;
        });

    }
  }

  selectAdminTemp: string;
  onSelectAdminTemplate(adminTemplate: string): void {
    this.selectAdminTemp = adminTemplate;
  }

  docFilesPath: string;
  //original file
  selectDocFile(event) {
    this.selectedDocFiles = event.target.files;
    this.docFilesPath = event.target.files.name;
    this.currentDocFileUpload = undefined;
  }

  uploadDoc() {

   //  $('#slideDocLoadingModal').modal('show');
    this.docProgress.docPercentage = 0;
    this.currentDocFileUpload = this.selectedDocFiles.item(0);

    if ( /*(this.currentDocFileUpload.type === "application/msword") || */
      (this.currentDocFileUpload.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {

      this.slideService.pushFileToStorage(this.currentDocFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.docProgress.docPercentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('Original Doc is completely uploaded!');
          this.changeToThird = "Change";
        //   $('#slideDocLoadingModal').modal('hide');
        }
      });
    } else {
      $('#slideTemplateUploadingFailModal').modal('show');
    }

    this.selectedDocFiles = undefined;
  }

  permissionToDocCustomReport: string;
  startCustomDocValidation(fontDocfamily: string) {

    const newDoc: CustomDoc = new CustomDoc();
    newDoc.fontfamily = fontDocfamily;
    newDoc.header = this.selectDocHeader;
    newDoc.footer = this.selectDocFooter;
    newDoc.numbering = "default";
    newDoc.materialName = this.currentDocFileUpload.name;
    newDoc.masterFirstName = this.selectAdminTemp;

    console.log(newDoc);

    this.slideService.addCustomDoc(newDoc)
      .subscribe(insertedSlide => {
        console.log(insertedSlide);
        this.permissionToDocCustomReport = "Okay";
      });

  }


  permissionToDocReport: string;
  startStandardDocValidation() {
    const newDoc: StandardDoc = new StandardDoc();
    newDoc.materialName = this.currentDocFileUpload.name;
    newDoc.masterFirstName = this.selectAdminTemp;
    this.slideService.addSandardDoc(newDoc)
      .subscribe(insertedSlide => {
        console.log(insertedSlide);
        this.permissionToDocReport = "Okay";
      });
  }

  reportList: DocReport[];

  validateDoc() {

    $('#docStandradLoadingModal').modal('show');
    this.reportList = null;
    this.slideService.getDocReport().subscribe(
      (updatedReport) => {

        this.reportList = updatedReport;

      });


    // $('#docStandradLoadingModal').modal('hide');
  }

  validateCustomDoc() {
    $('#docStandradLoadingModal').modal('show');
    this.reportList = null;
    this.slideService.getCustomDocReport().subscribe(
      (updatedReport) => {

        this.reportList = updatedReport;

      });


    // $('#docStandradLoadingModal').modal('hide');
  }

  pageRefresh() {
    location.reload();
  }
}
