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
import {PoiService} from './services/poi.service'


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TestComponent,
    CategoryExplorerComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
