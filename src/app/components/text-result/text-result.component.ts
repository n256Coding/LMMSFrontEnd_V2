import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-result',
  templateUrl: './text-result.component.html',
  styleUrls: ['./text-result.component.css']
})
export class TextResultComponent implements OnInit {
  @Input() rating: number;
  @Input() url: string;
  @Input() description: string;

  constructor() { }

  updateRatings() {
    if (this.rating > 0) {
      alert('Rate ' + this.rating);
    }
  }

  ngOnInit() {
  }
}
