import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {PoiService} from '../../services/poi.service';
import {CategoryDataSource} from './category.data-source';
import {Category} from '../../models/category';
import {AddCategoryDialogComponent} from './add-category-dialog/add-category-dialog.component';
import {MatDialog} from '@angular/material';
import {PoiDataSource} from './poi.data-source';
import {Poi} from '../../models/poi';
import {AddPoiDialogComponent} from './add-poi-dialog/add-poi-dialog.component';

@Component({
  selector: 'app-category-explorer',
  templateUrl: './category-explorer.component.html',
  styleUrls: ['./category-explorer.component.scss']
})
export class CategoryExplorerComponent implements OnInit {

  categoryDatasource: CategoryDataSource;
  displayedColumnsCategory = ['name', 'delete'];

  poiDatasource: PoiDataSource;
  displayedColumnsPoi = ['name'];

  currentCategory: Category;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private poiService: PoiService) {
  }

  ngOnInit() {
    this.categoryDatasource = new CategoryDataSource(this.categoryService);
    this.poiDatasource = new PoiDataSource(this.poiService);
  }

  enterCategory(new_category: Category) {
    this.categoryService.loadCategories(new_category);
    this.currentCategory = new_category;
    this.poiService.loadPois(this.currentCategory);
  }

  deleteCategory(category) {
    this.categoryService.delete(category);
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: new Category()
    });
    dialogRef.afterClosed().subscribe(new_category => {
      if (this.currentCategory) {
        new_category.parent = this.currentCategory.id;
      }
      new_category.subcategories = Array<number>();
      new_category.pois = Array<number>();

      this.categoryService.create(new_category);
    });
  }

  addPoi() {
    const dialogRef = this.dialog.open(AddPoiDialogComponent, {
      data: new Poi()
    });
    dialogRef.afterClosed().subscribe(new_poi => {
      this.poiService.create(this.currentCategory, new_poi);
    });
  }

}
