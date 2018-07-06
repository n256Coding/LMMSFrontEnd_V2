import { Rating } from './../../models/rating';
import { User } from './../../models/user';
import { UserSessionService } from './../../services/user-session.service';
import { Component, OnInit, Input } from '@angular/core';
import { TextResourceService } from '../../services/text-resource.service';

@Component({
  selector: 'app-text-result',
  templateUrl: './text-result.component.html',
  styleUrls: ['./text-result.component.css']
})
export class TextResultComponent implements OnInit {
  @Input() rating: number;
  @Input() url: string;
  @Input() description: string;
  @Input() _id: string;

  private user: User;

  constructor(private textResourceService: TextResourceService, private userSession: UserSessionService) { }

  getUser() {
    this.userSession.currentMessage.subscribe(data => {
      this.user = data;
    });
  }

  updateRatings() {
    if (this.rating > 0) {
      const ratingRequest = new Rating();
      ratingRequest.resourceId = this._id;
      ratingRequest.userId = this.user.id;
      ratingRequest.rating = this.rating;

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
  }
}
