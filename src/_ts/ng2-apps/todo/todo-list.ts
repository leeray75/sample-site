declare var MySite: any;
import {Component, Input} from 'angular2/core';
import {Todo} from './todo';
@Component({
  selector: 'todo-list',
  styles: [`
    .done-true {
      text-decoration: line-through;
      color: grey;
    }`
  ],
  templateUrl: MySite.appSrc+'/templates/ng2/todo/todo-list.html'
})
export class TodoList {
  @Input() todos: Todo[];
}