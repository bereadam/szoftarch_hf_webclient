import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {MenuComponent} from './components/menu/menu.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CategoryExplorerComponent} from './components/category-explorer/category-explorer.component';
import {CategoryService} from './services/category.service';
import {PoiService} from './services/poi.service';
import { AddCategoryDialogComponent } from './components/category-explorer/add-category-dialog/add-category-dialog.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddPoiDialogComponent } from './components/category-explorer/add-poi-dialog/add-poi-dialog.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './auth.guard';
import { UsersComponent } from './components/users/users.component';
import {UsersService} from './services/users.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CategoryExplorerComponent,
    AddCategoryDialogComponent,
    AddPoiDialogComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'categoryexplorer',
        component: CategoryExplorerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
      }
    ]),
  ],
  providers: [
    CategoryService,
    PoiService,
    AuthService,
    AuthGuard,
    UsersService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCategoryDialogComponent,
    AddPoiDialogComponent,
  ]
})
export class AppModule {
}
