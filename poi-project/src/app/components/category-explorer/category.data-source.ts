import {DataSource} from '@angular/cdk/collections';
import {CategoryService} from '../../services/category.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import {Category} from '../../models/category';

export class CategoryDataSource extends DataSource<Category> {

  constructor(private categoryService: CategoryService) {
    super();
  }

  connect(): Observable<Category[]> {
    const dataChanges = [
      this.categoryService.categories,
    ];

    return Observable.merge(...dataChanges).map(() => {
      const data = this.categoryService.categories.value.slice();
      return data;
    });
  }

  disconnect() {
  }
}
