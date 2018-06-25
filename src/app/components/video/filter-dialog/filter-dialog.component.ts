import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

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
        public dialogRef: MatDialogRef<FilterDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.filterFormGroup = this.formBuilder.group({
            filters: this.formBuilder.array([])

        });

        setTimeout((res) => {
            this.filters = ["duration > 20 min", "duration < 4 min", "duration (4 - 20) min", "HD quality", "presenter visible in  the video", "code visible in the video", "IDE : Eclipse", "IDE : Intellij (Idea, Pycharm, webstorm)", "IDE : Visual studio", "IDE : Net beans", "IDE : Visual studio Code", "IDE : Android studio"];
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