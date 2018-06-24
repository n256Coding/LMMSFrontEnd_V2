import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { listItem } from '../../../models/ListItemModel';
import { videoService } from "../../../services/video-service";
import { postModel } from "../../../models/searchPostModel";

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

    constructor(private _videoService: videoService) {
    }

    searchNewVideos() {
        console.log("searching new videos");
        this._videoService.searchNewVideos(this.postModel);
    }

    navigate(url: string) {
        window.open(url);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.listItems = this.listItemsData;
    }

}

