import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { listItem } from '../../../models/ListItemModel';
import { videoService } from "../../../services/video-service";
import { postModel } from "../../../models/searchPostModel";
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})

export class ListItemComponent implements OnChanges {

    @Input() postModel: postModel
    @Input() listItemsData: listItem;
    @Input() hasData: boolean;

    listItems: listItem;
    errorMessage: string;
    emptyData: boolean = true;

    constructor(private _videoService: videoService, private router: Router) { }

    searchNewVideos() {
        this._videoService
            .searchNewVideos(this.postModel)
            .subscribe(data => {
                console.log(data);
                this.router.navigateByUrl('/video/processing');
            }, err => {
                console.log(err);
            });

    }

    navigate(url: string) {
        window.open(url);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.listItems = this.listItemsData;
    }

}

