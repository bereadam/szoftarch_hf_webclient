import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {PoiService} from '../../services/poi.service';
import {CategoryDataSource} from './category.data-source';
import {Category} from '../../models/category';

@Component({
  selector: 'app-category-explorer',
  templateUrl: './category-explorer.component.html',
  styleUrls: ['./category-explorer.component.scss']
})
export class CategoryExplorerComponent implements OnInit {

  categoryDatasource: CategoryDataSource;
  displayedColumns = ['name'];

  currentCategory: Category;

  constructor(private categoryService: CategoryService,
              private poiService: PoiService) {
  }

  ngOnInit() {
    this.categoryDatasource = new CategoryDataSource(this.categoryService);
  }

  enterCategory(new_category: Category) {
    this.categoryService.loadCategories(this.currentCategory, new_category);
  }

  addCategory() {
    console.log('Add category clicked');
  }

}
