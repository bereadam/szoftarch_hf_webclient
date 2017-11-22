import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import {Category} from '../models/category';

@Injectable()
export class CategoryService {

  categories: BehaviorSubject<Category[]>;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    this.categories = <BehaviorSubject<Category[]>> new BehaviorSubject([]);
    this.loadCategories();
  }

  parseCategory(category): Category {
    if (category) {
      return new Category(
        category.id,
        category.name,
        category.parent,
        category.subcategories,
        category.pois
      );
    }
  }

  create(new_category) {
    const payload = {name: new_category.name};
    this.http.post(`${environment.baseurl}${environment.categorypath}`,
      JSON.stringify(payload),
      {headers: this.headers}).subscribe(response => {
      if (new_category.parent) {
        new_category.id = response['id'];
        this.setParent(new_category);
      } else {
        const cats = this.categories.getValue();
        cats.push(new_category);
        this.categories.next(cats);
      }
    });
  }

  delete(category) {
    this.http.delete(`${environment.baseurl}${environment.categorypath}${category.id}/`).subscribe(response => {
        const cats = this.categories.getValue()
        const i = cats.indexOf(category);
        if (i !== -1) {
          cats.splice(i, 1);
          this.categories.next(cats);
        }
      });
  }

  setParent(new_category) {
    const payload = {
      parentID: new_category.parent,
      subcategoryId: new_category.id
    };
    this.http.post(`${environment.baseurl}${environment.addsubcategorypath}`, JSON.stringify(payload),
      {headers: this.headers}).subscribe(response => {

      const cats = this.categories.getValue();
      cats.push(new_category);
      this.categories.next(cats);
    });
  }

  loadCategories(category: Category = null) {
    let url;
    if (category && category.id) {
      const result = Array<Category>();

      if (category.parent) {
        url = `${environment.baseurl}${environment.categorypath}${category.parent}/`
        this.http.get(url, {headers: this.headers}).subscribe(rawcategory => {
          const parent = this.parseCategory(rawcategory);
          parent.name = '..';
          result.push(parent);
          this.categories.next(result);
        });
      } else {
        const root = new Category();
        root.name = '..';
        result.push(root);
        this.categories.next(result);
      }

      category.subcategories.map(subcategoryID => {
        url = `${environment.baseurl}${environment.categorypath}${subcategoryID}/`;
        this.http.get(url, {headers: this.headers}).subscribe(rawcategory => {
          result.push(this.parseCategory(rawcategory));
          this.categories.next(result);
        });
      });
      this.categories.next(result);

    } else {
      url = `${environment.baseurl}${environment.categorypath}`;

      this.http.get(url, {headers: this.headers}).subscribe(
        rawcategories => {
          const x = rawcategories as any[];
          this.categories.next(
            x.map(rawcategory => {
              return this.parseCategory(rawcategory);
            })
          );
        });
    }
  }

}
