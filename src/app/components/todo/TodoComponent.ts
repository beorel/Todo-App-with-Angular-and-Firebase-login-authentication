import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../shared/todo.service';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  finishedList: any[] = [];

  constructor(private todoService: TodoService, private authService: AuthService) { }

  //ngOnit fetches data from firestorecollection(from the document in firebase), then updates using valuechanges() with each unique ID;
  //suncribe is listening to the chnages and updating the 2 properties todo & finished list
  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({ idField: 'id' })
      .subscribe(item => {
        this.todos = item.filter((todo: any) => !todo.isDone);
        this.finishedList = item.filter((todo: any) => todo.isDone);
      });
  }

  // it takes the input of the user, if the input field/ title input value is not empty then it calls the addTodo(from todoServices) containing the text
  // to add it to the list of todo then empty the input field
  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todoService.addTodo(titleInput.value);
      titleInput.value = "";
    }
  }

  //it checks if the user changes the status to done or not done by using boolena true or false, it calls update-todo-status from todoservice
  //to update the task using the id and boolean true/false
  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }

  //calls the delete tod from the todoservice to delete
  onDelete(id: string) {
    this.todoService.deleteTodo(id);
  }

  // Call the logout method from AuthService
  logout() {
    this.authService.logout();
  }
}
