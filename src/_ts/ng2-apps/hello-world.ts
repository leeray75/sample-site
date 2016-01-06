import {Component} from 'angular2/core';

declare var MySite: any;

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'hello-world',
  // Location of the template for this component
  templateUrl: MySite.appSrc+'/templates/ng2/hello-world/hello-world.html'
})
export class HelloWorld {
  // Declaring the variable for binding with initial value
	user: Object = {
		yourName: ''
	};
}
