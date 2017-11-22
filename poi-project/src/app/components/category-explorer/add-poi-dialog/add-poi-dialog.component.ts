import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Poi} from '../../../models/poi';

@Component({
  selector: 'app-add-poi-dialog',
  templateUrl: './add-poi-dialog.component.html',
  styleUrls: ['./add-poi-dialog.component.scss']
})
export class AddPoiDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPoiDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Poi) {
  }

  ngOnInit() {
  }
}
