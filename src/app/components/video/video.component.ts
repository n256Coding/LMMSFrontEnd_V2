import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FilterService } from './filter-service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit{

  selectedFilters: string[] = [];

  constructor(public dialog: MatDialog) { }

  searchKeyword: String;

  search() {
   
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
   
  }
}

//dialog component
@Component({
  selector: 'filter-dialog',
  templateUrl: './filter-dialog.html',
  styleUrls: ['./filter-dialog.css']
})
export class FilterDialog implements OnInit {

  filterFormGroup: FormGroup
  filters: any;
  selected: any;

  constructor(
    public dialogRef: MatDialogRef<FilterDialog>, @Inject(MAT_DIALOG_DATA) public data: any, public FilterService: FilterService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterFormGroup = this.formBuilder.group({
      filters: this.formBuilder.array([])

    });

    setTimeout((res) => {
      this.filters = ["Duration < 10 mins", "Duration < 20 mins", "IDE : Eclipse", "IDE : Intellij (Idea, Pycharm, webstorm)", "IDE : Visual studio", "IDE : Net beans", "IDE : Visual studio Code", "IDE : Android studio"];
    });
  }

  onChange(event) {
    const filters = <FormArray>this.filterFormGroup.get('filters') as FormArray;

    if (event.checked) {
      filters.push(new FormControl(event.source.value))
    } else {
      const i = filters.controls.findIndex(x => x.value === event.source.value);
      filters.removeAt(i);
    }
  }

  submit() {
    this.dialogRef.close(this.filterFormGroup.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
