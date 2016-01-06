declare var MySite: any;
import {Component} from 'angular2/core';
import {Todo} from './todo';
import {TodoList} from './todo-list';
import {TodoForm} from './todo-form';

@Component({
  selector: 'todo',
  templateUrl: MySite.appSrc+'/templates/ng2/todo/todo-app.html',
  directives: [TodoList, TodoForm]
})
export class TodoApp {
  todos: Todo[] = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}
  ];
  get remaining(): number {
    return this.todos.reduce((count, todo: Todo) => count + todo.done, 0);
  }
  archive(): void {
    var oldTodos = this.todos;
    this.todos = [];
    oldTodos.forEach((todo: Todo) => {
      if (!todo.done) this.todos.push(todo);
    });
  }
  addTask(task: Todo) {
    this.todos.push(task);
  }
}