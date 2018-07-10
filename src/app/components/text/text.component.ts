import { Router } from '@angular/router';
import { InsiteSearchResult } from './../../models/insiteSearchResult';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TextResourceService} from "../../services/text-resource.service";
declare var $: any;
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  results: InsiteSearchResult;
  contentType: string;
  errorContentHidden = true;
  holdOnMessageHidden = true;

  setErrorContentStatus(status: boolean) {
    this.errorContentHidden = status;
  }

  constructor(private textService: TextResourceService, private dataService: DataService, private router: Router) { }

  search(contentType: string){
    $('#exampleModal').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
    setTimeout(()=>{
      this.holdOnMessageHidden = false;
    }, 15000);
    this.textService.searchResource(this.results.originalQuery, contentType == 'ebook').subscribe(
      data => {
        $('#exampleModal').modal('hide');
        this.dataService.changeResults(data);
        this.dataService.changeContentType(contentType);
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
    this.dataService.currentResults.subscribe(
      data => {
        if (data.originalQuery === undefined) {
          this.router.navigateByUrl('/text-request');
        } else {
          this.results = data;
        }
      }
    );

    this.dataService.currentContentType.subscribe(
      data => {
        this.contentType = data;
      }
    )
  }

}
