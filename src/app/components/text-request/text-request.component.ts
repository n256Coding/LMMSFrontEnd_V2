import { DataService } from './../../services/data.service';
import { TextResourceService } from './../../services/text-resource.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-text-request',
  templateUrl: './text-request.component.html',
  styleUrls: ['./text-request.component.css']
})
export class TextRequestComponent implements OnInit {

  constructor(private textService: TextResourceService,
    private router: Router,
    private dataService: DataService) { }

  inputValue = 'sql select query';
  isPdf: boolean;
  contentType = "webpage";
  public holdOnMessageHidden = true;

  errorContentHidden = true;

  setErrorContentStatus(status: boolean) {
    this.errorContentHidden = status;
    this.holdOnMessageHidden = true;
  }

  setHoldOnMessage(status: boolean){
    this.holdOnMessageHidden = status;
  }

  setContentType(contentType: string){
    this.contentType = contentType;
  }


  search() {
    $('#exampleModal').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
    setTimeout(()=>{
      this.holdOnMessageHidden = false;
    }, 10000);
    if(this.contentType == 'ebook'){
      this.isPdf = true;
    }else{
      this.isPdf = false;
    }
    this.textService.searchResource(this.inputValue, this.isPdf).subscribe(
      data => {
        $('#exampleModal').modal('hide');
        this.dataService.changeResults(data);
        this.dataService.changeContentType(this.isPdf ? 'ebook' : 'webpage');
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
