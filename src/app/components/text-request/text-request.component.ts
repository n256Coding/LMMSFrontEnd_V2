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

  clickMe() {
    alert(this.inputValue + 'isPdf: ' + this.isPdf);
  }

  search() {
    this.textService.searchResource(this.inputValue, this.isPdf).subscribe(
      data => {
        this.dataService.changeMessage(data);
        this.router.navigateByUrl('/text-responce');
      },
      err => {
        alert('cannot connect to server');
      },
      () => {
        console.log('function completed');
      }
    );
  }

  ngOnInit() {
  }

}
