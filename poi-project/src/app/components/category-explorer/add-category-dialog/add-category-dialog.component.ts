import {Component, Inject, OnInit} from '@angular/core';
import {Category} from '../../../models/category';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category) {
  }

  ngOnInit() {
  }
}
