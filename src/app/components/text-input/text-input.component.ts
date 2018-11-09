import { Component, OnInit } from '@angular/core';
import { TextResourceService} from "../../services/text-resource.service";
import {forEach} from "@angular/router/src/utils/collection";

declare var $: any;
@Component({
  selector: 'app-text-input',
  templateUrl: 'text-input.component.html',
  styleUrls: ['text-input.component.css']
})
export class TextInputComponent implements OnInit {

  constructor(private textResourceService: TextResourceService) { }

  allTrustedSites: TrustedSites[];
  trustedSite: TrustedSites;
  isNewSite: boolean;
  isWebAddressCorrect: boolean;

  loadAllTrustedSites(){
    this.textResourceService.getTrustedSites().subscribe(
      data => {
        this.allTrustedSites = data;
      },
      error => {
        alert('It came to error');
      },
      ()=>{
        this.trustedSite = this.allTrustedSites[0];
      }
    );
  }

  addOrUpdateTrustedSite(newTrustedSites: TrustedSites){
    console.log(newTrustedSites);
    var regExp = /, ?| {2,}/gm;
    var webAddressRegEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/m;
    newTrustedSites.sites = newTrustedSites.sites.toString().toLowerCase().trim().replace(regExp, ",").split(",");
    newTrustedSites.synons = newTrustedSites.synons.toString().toLowerCase().trim().replace(regExp, ",").split(",");

    for(let site of newTrustedSites.sites){
      if(!webAddressRegEx.test(site.trim())){
        this.isWebAddressCorrect = false;
        return;
      }
    }

    this.textResourceService.addOrUpdateTrustedSites(newTrustedSites).subscribe(
      data => {
        this.loadAllTrustedSites();
        $('#exampleModal').modal('hide');
      },
      error => {
        this.loadAllTrustedSites();
        $('#exampleModal').modal('hide');
      }
    )
  }

  deleteTrustedSite(keyword: string){
    this.textResourceService.deleteTrustedSites(keyword).subscribe(
      data => {
        this.loadAllTrustedSites();
      },
      error => {
        this.loadAllTrustedSites();
      }
    )
  }

  showUpdateDialog(newTrustedSites: TrustedSites){
    this.isWebAddressCorrect = true;
    if(newTrustedSites == null){
      this.trustedSite.keyword = "";
      this.trustedSite.sites = [];
      this.trustedSite.synons = [];
      this.isNewSite = true;
    }else{
      this.trustedSite = newTrustedSites;
      this.isNewSite = false;
    }
    $('#exampleModal').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
  }

  ngOnInit() {
    this.loadAllTrustedSites();
  }

}
