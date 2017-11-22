import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Poi} from '../models/poi';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';

@Injectable()
export class PoiService {

  pois: BehaviorSubject<Poi[]>;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    this.pois = <BehaviorSubject<Poi[]>> new BehaviorSubject([]);
    this.loadPois();
  }

  parsePoi(rawpoi): Poi {
    if (rawpoi) {
      const result = new Poi();

      result.name = rawpoi.name;
      result.desc = rawpoi.desc;
      result.lat = rawpoi.lat;
      result.lon = rawpoi.lon;

      return result;
    }
  }

  loadPois(category: Category = null) {
    if (category && category.id) {
      let url;
      const result = Array<Poi>();
      category.pois.map(poiID => {
        url = `${environment.baseurl}${environment.poipath}${poiID}/`;
        this.http.get(url, {headers: this.headers}).subscribe(rawpoi => {
          result.push(this.parsePoi(rawpoi));
          this.pois.next(result);
        });
      });
      this.pois.next(result);
    } else {
      this.pois.next([]);
    }
  }

  setParent(category: Category, poi: Poi) {
    const payload = {
      parentCategoryID: category.id,
      poiId: poi.id
    };
    this.http.post(`${environment.baseurl}${environment.addpoipath}`, JSON.stringify(payload),
      {headers: this.headers}).subscribe(response => {

      const pois = this.pois.getValue();
      pois.push(poi);
      this.pois.next(pois);
    });
  }

  create(category: Category, poi: Poi) {
    if (poi) {
      this.http.post(`${environment.baseurl}${environment.poipath}`, JSON.stringify(poi),
        {headers: this.headers}).subscribe(response => {
          poi.id = response['id'];
          this.setParent(category, poi);
      });
    }
  }
}
