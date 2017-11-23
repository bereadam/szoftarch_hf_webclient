import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {



  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  is_superuser() {
    return this.authService.user_is_superuser();
  }

}
