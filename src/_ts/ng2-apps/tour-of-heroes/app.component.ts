/// <reference path="../../../../typings/my-site/my-site.d.ts" />
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail.component';
import {DashboardComponent} from './dashboard.component';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-app',
  templateUrl: MySite.templatesSrc+'app.component.html',
  styleUrls: [MySite.stylesSrc+'app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HeroService]
})
@RouteConfig([
  // {path: '/', redirectTo: ['Dashboard'] },
  {path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
  {path: '/heroes', name: 'Heroes', component: HeroesComponent},
  {path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent}
])
export class AppComponent {
  public title = 'Tour of Heroes';
}
