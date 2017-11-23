import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UsersService {

  users: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.users = <BehaviorSubject<User[]>> new BehaviorSubject([]);
    this.loadUsers();
  }

  private get_headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('currentUser')
    });
  }

  loadUsers() {
    this.http.get(`${environment.baseurl}${environment.userspath}`, {headers: this.get_headers()}).subscribe(
      rawusers => {
        const x = rawusers as any[];
        this.users.next(
          x.map(rawuser => {
            return this.parseUser(rawuser);
          })
        );
      });
  }

  set_admin(user, state) {
    if (state) {
      this.http.get(`${environment.baseurl}${environment.toadminpath}${user.id}`, {headers: this.get_headers()}).subscribe(response =>{
        user.is_staff = state;
      });
    } else {
      this.http.get(`${environment.baseurl}${environment.removeadminpath}${user.id}`, {headers: this.get_headers()}).subscribe(response =>{
        user.is_staff = state;
      });
    }

  }

  private parseUser(rawuser) {
    const user = new User();
    user.id = rawuser.id;
    user.email = rawuser.username;
    user.is_staff = rawuser.is_staff;
    user.is_superuser = rawuser.is_superuser

    return user;
  }
}
