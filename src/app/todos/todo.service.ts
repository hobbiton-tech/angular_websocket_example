import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  //variables
  url = 'http://localhost/todos/api';

  constructor(private http: HttpClient) {}

  //get all todos
  getTodos() {
    return this.http.get(this.url);
  }

  //get single todo
  getTodo(id) {
    return this.http.get(this.url + '?id=' + id);
  }

  //add todo
  addTodo(todo) {
    this.http.post(this.url, todo);
  }

  //edit todo
  editTodo(id, todo) {
    this.http.patch(this.url + '?=' + id, todo);
  }

  //delete todo
  deleteTodo(id) {
    this.http.delete(this.url, id);
  }
}
