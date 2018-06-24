import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { postModel } from "../../models/searchPostModel";
import { FilterDialog } from "./filter-dialog/filter-dialog.component";
import { videoService } from "../../services/video-service";
import { listItem } from "../../models/ListItemModel";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent {

  selectedFilters: string[];
  model: postModel;
  searchKeyword: String;
  loadComponent: boolean = false;
  hasData: boolean;

  listItems: listItem[];
  message: string;

  constructor(public dialog: MatDialog, private videoService: videoService) {
    this.model = new postModel();
  }

  searchInDB() {
    this.model.userId = "u0001";
    this.model.filters = this.selectedFilters;
    this.model.searchKeyword = this.searchKeyword;

    this.videoService.searchVideosInDatabase(this.model)
      .subscribe(data => {
        this.listItems = data;
        this.loadComponent = true;
        if (data.length > 0) {
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      },
        err => {
          console.log('raw error =>', err)
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
}

