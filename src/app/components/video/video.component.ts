import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { postModel } from "../../models/searchPostModel";
import { FilterDialog } from "./filter-dialog/filter-dialog.component";
import { videoService } from "../../services/video-service";
import { listItem } from "../../models/ListItemModel";
import { User } from '../../models/User';
import { UserSessionService } from '../../services/user-session.service';

declare var $: any;
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit{

  selectedFilters: string[];
  model: postModel;
  searchKeyword: String;
  loadComponent: boolean = false;
  hasData: boolean;

  listItems: listItem[];
  message: string;

  private user: User;

  constructor(public dialog: MatDialog, private videoService: videoService, private userSession: UserSessionService) {
    this.model = new postModel();
  }

  getUser() {
    this.user = this.userSession.getCurrentUser();
  }

  searchInDB() {
    this.model.userId = this.user.id;
	
	console.log("user id : " + this.model.userId);
	
    this.model.filters = this.selectedFilters;
    this.model.searchKeyword = this.searchKeyword;
    $('#moodleLoadingModal').modal('show');

    this.videoService.searchVideosInDatabase(this.model)
      .subscribe(data => {
        this.listItems = data;
        this.loadComponent = true;
        if (data.length > 0) {
          this.hasData = true;
        } else {
          this.hasData = false;
        }
        $('#moodleLoadingModal').modal('hide');
      },
        err => {
          console.log('raw error =>', err)
          $('#moodleLoadingModal').modal('hide');
        }
      );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(FilterDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedFilters = result.filters;
      } else {
        // User clicked 'Cancel' or clicked outside the dialog
      }
    });
  }

  remove(i: any): void {
    if (i >= 0) {
      this.selectedFilters.splice(i, 1);
    }
  }

  ngOnInit() {
    this.getUser();
  }
}

