import { DataService } from './../../services/data.service';
import { TextResourceService } from './../../services/text-resource.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as $ from 'jquery';

@Component({
  selector: 'app-text-request',
  templateUrl: './text-request.component.html',
  styleUrls: ['./text-request.component.css']
})
export class TextRequestComponent implements OnInit {

  constructor(private textService: TextResourceService,
    private router: Router,
    private dataService: DataService) { }

  inputValue = '';
  isPdf: boolean;
  contentType = "web";

  errorContentHidden = true;

  setErrorContentStatus(status: boolean) {
    this.errorContentHidden = status;
  }


  search() {
    $('#exampleModal').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
    if(this.contentType == 'ebook'){
      this.isPdf = true;
    }else{
      this.isPdf = false;
    }
    this.textService.searchResource(this.inputValue, this.isPdf).subscribe(
      data => {
        $('#exampleModal').modal('hide');
        this.dataService.changeMessage(data);
        this.router.navigateByUrl('/text-responce');
      },
      err => {
        this.errorContentHidden = false;
      },
      () => {
        console.log('function completed');
      }
    );
  }



  ngOnInit() {
  }

}
