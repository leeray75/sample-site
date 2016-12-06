import {  Component }       from '@angular/core';
declare var MySite:any;

@Component({
	//moduleId: module.id,
  // Declare the tag name in index.html to where the component attaches
  selector: 'hello-world',
  // Location of the template for this component
  templateUrl: MySite.templateSrc+'/hello-world.html',
  styleUrls: [MySite.stylesSrc+'/hello-world.css']
})
export class HelloWorldComponent {
  // Declaring the variable for binding with initial value
  user: Object = {
		yourName: ''
	};
}