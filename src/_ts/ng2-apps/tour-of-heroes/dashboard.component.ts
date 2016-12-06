import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
	//moduleId: module.id,
  	selector: 'my-dashboard',
  	templateUrl: window.MySite.templateSrc+'dashboard.component.html',
  	styleUrls: [window.MySite.stylesSrc+'dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
