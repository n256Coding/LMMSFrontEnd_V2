import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-recommendation-item',
  templateUrl: './recommendation-item.component.html',
  styleUrls: ['./recommendation-item.component.css']
})
export class RecommendationItemComponent implements OnInit {
  @Input() url: string;
  @Input() description: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
