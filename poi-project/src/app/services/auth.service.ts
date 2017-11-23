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

  user_is_admin() {
    return localStorage.getItem('is_admin') === 'true';
  }

  user_is_superuser() {
    return localStorage.getItem('is_superuser') === 'true';
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
        localStorage.setItem('is_admin', response['is_admin']);
        localStorage.setItem('is_superuser', response['is_superuser']);
        this.router.navigate(['/categoryexplorer']);
      }
    });
  }

  logout() {
    this.http.get(`${environment.baseurl}${environment.logoutpath}`,
      {headers: this.get_headers(true)})
    localStorage.removeItem('currentUser');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('is_superuser');
  }
}
