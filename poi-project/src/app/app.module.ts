import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {MenuComponent} from './components/menu/menu.component';
import {RouterModule} from '@angular/router';
import {TestComponent} from './components/test/test.component';
import {HttpClientModule} from '@angular/common/http';
import {CategoryExplorerComponent} from './components/category-explorer/category-explorer.component';
import {CategoryService} from './services/category.service';
import {PoiService} from './services/poi.service';
import { AddCategoryDialogComponent } from './components/category-explorer/add-category-dialog/add-category-dialog.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TestComponent,
    CategoryExplorerComponent,
    AddCategoryDialogComponent
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
        redirectTo: '/test',
        pathMatch: 'full'
      },
      {
        path: 'test',
        component: TestComponent,
      },
      {
        path: 'categoryexplorer',
        component: CategoryExplorerComponent,
      },
      {
        path: 'categoryexplorer/:id',
        component: CategoryExplorerComponent,
      }
    ]),
  ],
  providers: [
    CategoryService,
    PoiService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCategoryDialogComponent,
  ]
})
export class AppModule {
}
