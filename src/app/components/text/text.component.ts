import { Router } from '@angular/router';
import { InsiteSearchResult } from './../../models/insiteSearchResult';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TextResourceService} from "../../services/text-resource.service";
import {UserSessionService} from "../../services/user-session.service";
import {User} from "../../models/user";
declare var $: any;
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  results: InsiteSearchResult;
  contentType: string;
  errorContentHidden = true;
  holdOnMessageHidden = true;
  user: User;

  setErrorContentStatus(status: boolean) {
    this.errorContentHidden = status;
  }

  constructor(private textService: TextResourceService,
              private dataService: DataService,
              private sessionService: UserSessionService,
              private router: Router) { }

  search(contentType: string){
    $('#exampleModal').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
    setTimeout(()=>{
      this.holdOnMessageHidden = false;
    }, 15000);
    this.textService.searchResource(this.results.originalQuery, contentType == 'ebook', this.user.id).subscribe(
      data => {
        $('#exampleModal').modal('hide');
        this.dataService.changeResults(data);
        this.dataService.changeContentType(contentType);
        this.router.navigateByUrl('/text-responce');
      },
      err => {
        this.errorContentHidden = false;
      },
      () => {
        console.log('function completed');
      }
    );
  }


  ngOnInit() {
    //TODO: Debug mode code
    // this.results = {"resultItems":[{"_id":"5b450b1369f9558efd46c529","url":"http://programming-book.com/download/2017/ComputerBooks/571017/SQL Server 2014 Development Essentials.pdf","description":"","rating":0,"title":"","tf_idf":0.02779167993237795},{"_id":"5b45039669f9558efd46bcb5","url":"http://programming-book.com/download/2017/ComputerBooks/581017/The Art Of SQL Server Filestream A Quick Start Guide For Developers And Administrators.pdf","description":"","rating":0,"title":"","tf_idf":0.017481549876643156},{"_id":"5b45046869f9558efd46bdc1","url":"http://programming-book.com/download/2017/ComputerBooks/461017/Oracle Database SQL Reference 10g Release.pdf","description":"","rating":0,"title":"","tf_idf":0.0171569873817238},{"_id":"5b450c0569f9558efd46c661","url":"http://programming-book.com/download/2017/ComputerBooks/601017/Troubleshooting SQL Server A Guide For The Accidental Dba.pdf","description":"","rating":0,"title":"","tf_idf":0.01701329265597503},{"_id":"5b4503a869f9558efd46bcd0","url":"http://programming-book.com/download/2017/ComputerBooks/521017/Protecting SQL Server Data.pdf","description":"","rating":0,"title":"","tf_idf":0.016442133159214677},{"_id":"5b450dbd69f9558efd46c87f","url":"http://programming-book.com/download/2017/ComputerBooks/201017/Guide To SQL Server Maintenance Plans.pdf","description":"","rating":0,"title":"","tf_idf":0.015540827146073175},{"_id":"5b45048269f9558efd46bde9","url":"http://programming-book.com/download/2017/ComputerBooks/571017/SQL Server Tacklebox Essential Tools And Scripts For Dba.pdf","description":"","rating":0,"title":"","tf_idf":0.015245562533858665},{"_id":"5b4508bb69f9558efd46c305","url":"http://programming-book.com/download/2017/ComputerBooks/571017/SQL Server Team-Based Development.pdf","description":"","rating":0,"title":"","tf_idf":0.014281375721309211},{"_id":"5b45047569f9558efd46bdd7","url":"http://programming-book.com/download/2017/ComputerBooks/601017/Tribal SQL Extract SQL Server Storage Internals 101 Book.pdf","description":"","rating":0,"title":"","tf_idf":0.013973933081678045},{"_id":"5b4508d169f9558efd46c31f","url":"http://programming-book.com/download/2017/ComputerBooks/461017/Oracle Database SQLJ Developer Guide.pdf","description":"","rating":0,"title":"","tf_idf":0.012424942143569519},{"_id":"5b450b9b69f9558efd46c5d1","url":"http://programming-book.com/download/2017/ComputerBooks/501017/Pro Oracle SQL.pdf","description":"","rating":0,"title":"","tf_idf":0.011639923634579412},{"_id":"5b45088169f9558efd46c2b8","url":"http://programming-book.com/download/2017/ComputerBooks/261017/Implementing Data Warehouse With Microsoft SQL Server 2012 Book.pdf","description":"","rating":0,"title":"","tf_idf":0.008138526597042513},{"_id":"5b450b9d69f9558efd46c5d8","url":"http://programming-book.com/download/2017/ComputerBooks/371017/Mastering PHP Myadmin 3.3.X For Effective MySQL Management.pdf","description":"","rating":0,"title":"","tf_idf":0.006766688631832301},{"_id":"5b45062569f9558efd46bfe2","url":"http://programming-book.com/download/2017/ComputerBooks/421017/MySQL Administrator Bible.pdf","description":"","rating":0,"title":"","tf_idf":0.006189532805893748},{"_id":"5b44cba66931cae4805d0255","url":"http://programming-book.com/download/2017/ComputerBooks/261017/Inside The SQL Server Query Optimizer.pdf","description":"","rating":0,"title":"","tf_idf":0.006138808172710159},{"_id":"5b45041869f9558efd46bd5b","url":"http://programming-book.com/download/2017/ComputerBooks/471017/PHP And MySQL The Missing Manual 2nd Edition.pdf","description":"","rating":0,"title":"","tf_idf":0.004566133395928707},{"_id":"5b450e3569f9558efd46c911","url":"http://programming-book.com/download/2017/ComputerBooks/071017/Beginning PHP6 Apache MySQL Web Development.pdf","description":"","rating":0,"title":"","tf_idf":0.00342575370337588}],"count":17,"spellCorrectedQuery":"SQL database operation","originalQuery":"sql database operation","recommendations":[]};

    //TODO: Uncomment this in release
    this.dataService.currentResults.subscribe(
      data => {
        if (data.originalQuery === undefined) {
          this.router.navigateByUrl('/text-request');
        } else {
          this.results = data;
        }
      }
    );

    // //TODO: Debug mode code
    // this.textService.searchResource("sql database operations", false, "5b4dc760af2fc529d0510544").subscribe(
    //   data => {
    //     // $('#exampleModal').modal('hide');
    //     this.dataService.changeResults(data);
    //     this.dataService.changeContentType('webpage');
    //     // this.router.navigateByUrl('/text-responce');
    //   },
    //   err => {
    //     this.errorContentHidden = false;
    //   },
    //   () => {
    //     console.log('function completed');
    //   }
    // );
    //
    // //TODO: Debug mode code
    // this.dataService.currentResults.subscribe(
    //   data => {
    //     this.results = data;
    //     if (data.originalQuery === undefined) {
    //       // this.router.navigateByUrl('/text-request');
    //     } else {
    //       this.results = data;
    //     }
    //   }
    // );


    this.dataService.currentContentType.subscribe(
      data => {
        this.contentType = data;
      }
    );

    this.user = this.sessionService.getCurrentUser();
  }

}
