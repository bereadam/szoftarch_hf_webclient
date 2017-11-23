import {DataSource} from '@angular/cdk/collections';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';
import {Observable} from 'rxjs/Observable';

export class UsersDataSource extends DataSource<User> {

  constructor(private usersService: UsersService) {
    super();
  }

  connect(): Observable<User[]> {
    const dataChanges = [
      this.usersService.users,
    ];

    return Observable.merge(...dataChanges).map(() => {
      const data = this.usersService.users.value.slice();
      return data;
    });
  }

  disconnect() {
  }
}
