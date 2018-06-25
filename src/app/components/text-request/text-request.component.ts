import { DataService } from './../../services/data.service';
import { TextResourceService } from './../../services/text-resource.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-request',
  templateUrl: './text-request.component.html',
  styleUrls: ['./text-request.component.css']
})
export class TextRequestComponent implements OnInit {

  constructor(private textService: TextResourceService,
    private router: Router,
    private dataService: DataService) { }

  inputValue = 'java';
  isPdf = false;

  errorContentHidden = true;

  setErrorContentStatus(status: boolean) {
    this.errorContentHidden = status;
  }

  clickMe() {
    alert(this.inputValue + 'isPdf: ' + this.isPdf);
  }

  search() {
    $('#exampleModal').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
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
