import {Component, OnInit} from '@angular/core';
import {UsersDataSource} from './users.data-source';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private datasource: UsersDataSource;
  displayedColumns = ['email', 'admin', 'superadmin'];

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.datasource = new UsersDataSource(this.usersService);
    this.usersService.loadUsers();
  }

  set_admin(user, state) {
    this.usersService.set_admin(user, state);
  }

}
