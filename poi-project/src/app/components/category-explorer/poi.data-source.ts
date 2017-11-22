import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import {Poi} from '../../models/poi';
import {PoiService} from '../../services/poi.service';

export class PoiDataSource extends DataSource<Poi> {

  constructor(private poiService: PoiService) {
    super();
  }

  connect(): Observable<Poi[]> {
    const dataChanges = [
      this.poiService.pois,
    ];

    return Observable.merge(...dataChanges).map(() => {
      const data = this.poiService.pois.value.slice();
      return data;
    });
  }

  disconnect() {
  }
}
