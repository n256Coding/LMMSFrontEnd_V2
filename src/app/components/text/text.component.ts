import { Router } from '@angular/router';
import { InsiteSearchResult } from './../../models/insiteSearchResult';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  results: InsiteSearchResult;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      data => {
        if (data.originalQuery === undefined) {
          this.router.navigateByUrl('/text-request');
        } else {
          this.results = data;
        }
      }
    );
  }

}
