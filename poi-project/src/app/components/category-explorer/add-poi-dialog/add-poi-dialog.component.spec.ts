import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoiDialogComponent } from './add-poi-dialog.component';

describe('AddPoiDialogComponent', () => {
  let component: AddPoiDialogComponent;
  let fixture: ComponentFixture<AddPoiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPoiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPoiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
