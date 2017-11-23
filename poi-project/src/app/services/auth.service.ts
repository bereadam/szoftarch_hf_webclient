import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  private get_headers(with_auth_token = false) {

    const headers = {
      'Content-Type': 'application/json',
    }

    if (with_auth_token) {
      headers['Authorization'] = 'Token ' + localStorage.getItem('currentUser');
    }

    return new HttpHeaders(headers);
  }

  constructor(private router: Router,
              private http: HttpClient) {
  }

  user_is_logged_in() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  login(email, password) {
    const payload = {
      email: email,
      password: password
    };

    this.http.post(`${environment.baseurl}${environment.loginpath}`, JSON.stringify(payload),
      {headers: this.get_headers()}).subscribe(response => {
      if (response['sessionID']) {
        localStorage.setItem('currentUser', response['sessionID']);
        this.router.navigate(['/categoryexplorer']);
      }
    });
  }

  logout() {
    this.http.get(`${environment.baseurl}${environment.logoutpath}`,
      {headers: this.get_headers(true)})
    localStorage.removeItem('currentUser');
  }
}
