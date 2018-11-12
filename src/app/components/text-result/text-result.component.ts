import { Rating } from './../../models/rating';
import { User } from '../../models/user';
import { UserSessionService } from './../../services/user-session.service';
import { Component, OnInit, Input } from '@angular/core';
import { TextResourceService } from '../../services/text-resource.service';
import {InsiteSearchResultItem} from "../../models/insiteSearchResultItem";

@Component({
  selector: 'app-text-result',
  templateUrl: './text-result.component.html',
  styleUrls: ['./text-result.component.css']
})
export class TextResultComponent implements OnInit {
  @Input() result: InsiteSearchResultItem;
  @Input() contentType: string;
  // @Input() rating: number;
  // @Input() url: string;
  // @Input() description: string;
  // @Input() _id: string;
  // @Input() title: string;

  private user: User;

  constructor(private textResourceService: TextResourceService, private userSession: UserSessionService) { }

  getUser() {
    this.user = this.userSession.getCurrentUser();
  }

  updateRatings() {
    if (this.result.rating > 0) {
      const ratingRequest = new Rating();
      ratingRequest.item_id = this.result._id;
      ratingRequest.user_id = this.user.id;
      ratingRequest.preference = this.result.rating;

      this.textResourceService.setRating(ratingRequest).subscribe(
        data => {
          console.log('succesfully rated!');
        },
        err => {
          console.log('');
        }
      );
    }
  }

  ngOnInit() {
    this.getUser();
    if(this.result.title.length < 2){
      this.result.title = this.result.url;
    }
  }
}
