declare var MySite: any;

import {Component} from 'angular2/core';
import {UiTabs, UiPane} from './ui-tabs';

interface Detail{
	title: string;
	text: string
}

@Component({
  selector: 'di-demo',
  templateUrl: MySite.appSrc+'/templates/ng2/dependency-injection/di-demo.html',
  directives: [UiTabs, UiPane]
})
export class DiDemo {

  details: Detail[] = [];
  id: number = 0;
  addDetail() {
    this.id++;
    this.details.push({
      title: `Detail ${this.id}`,
      text: `Some detail text for ${this.id}...`
    });
  }
  removeDetail(detail) {
    this.details = this.details.filter((d) => d !== detail);
  }
}