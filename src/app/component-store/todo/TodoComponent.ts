import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TodoStore } from 'src/app/component-store/todo.store';
import { switchMap } from 'rxjs';
import { Todo } from '../todo.models';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoStore]
})
export class TodoComponent implements OnInit {
  todos$ = this.todoStore.todo$; // Observable for non-completed todos
  finishedList$ = this.todoStore.finishedList$;


  // todos: any[] = [];
  // finishedList: any[] = [];
  userID: string | null = null // a string or null if no user
  welcomeMessage: string = '';
  username: string | null = null;


  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private todoStore: TodoStore) { }

  //ngOnit fetches  userId from authService, listens if the user ID is signed in then assign it to userID. then updates using valuechanges() with each unique ID;
  //suncribe is listening to the chnages and updating the 2 properties todo & finished list, making sure the task is done andthe userID matches.
  ngOnInit(): void {
    // Fetch user-specific data using the AuthService
    this.authService.getUID().subscribe(uid => {
      if (uid) {
        this.userID = uid;
        return this.todoStore.loadTodos(uid);

      } else {
        return []
      }
    })
  }


  //>>>> GETTING THE USERNAME FOR WELCOME CAN COME LATER
  // this.authService.getUsername(this.userID).subscribe((username) => {
  //   this.username = username;
  //   console.log("welcome message", username)
  // });



  // it takes the input of the user, if the input field/ title input value is not empty  and that a user is logged in (this.userID is not null)
  // then it calls the addTodo(from todoServices) containing the text
  // to add it to the list of todo then empty the input field
  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value && this.userID) {
      const newTodo: Todo = {
        title: titleInput.value,
        isDone: false,
        uid: this.userID,
      }
      this.todoStore.addTodoEffect(newTodo)
      titleInput.value = "";
    }
  }

  //it checks if the user changes the status to done or not done by using boolena true or false, it calls update-todo-status from todoservice
  //to update the task using the id and boolean true/false
  onStatusChange(id: string, newStatus: boolean) {
    this.todoStore.updateTodoStatusEffect({id, isDone: newStatus});
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
