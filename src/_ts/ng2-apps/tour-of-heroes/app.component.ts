import { Component } from '@angular/core';
@Component({
  //moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: [window.MySite.stylesSrc+'app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
