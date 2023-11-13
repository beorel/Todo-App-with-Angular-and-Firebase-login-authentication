import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Todo } from "./todo.models";
import { EMPTY, catchError, of, switchMap, tap } from "rxjs";
import { TodoService } from "./todo.service";
import { trigger } from "@angular/animations";


export interface TodoState {
  todo: Todo[];
  finishedList: Todo[];
}

const initialState: TodoState = {
  todo: [],
  finishedList: []
}

@Injectable()

export class TodoStore extends ComponentStore<TodoState>{
  constructor(private todoService: TodoService) {
    super(initialState)
  }

  //select method takes specific part of the state which
  //can be observed
  readonly todo$ = this.select(state => state.todo);
  readonly finishedList$ = this.select(state => state.finishedList);

  //takes the current state and new value and return the new state
  //copy all existing properties, then overwrite the property with the new value provided.
  readonly loadTodo = this.updater((state, todo: Todo[]) => ({
    ...state,
    todo,
  }))

  readonly setFinishedList = this.updater((state, finishedList: Todo[]) => ({
    ...state,
    finishedList,
  }));

  readonly addTodo = this.updater((state, newTodo: Todo) => ({
    ...state,
    todo: [...state.todo, newTodo],
  }))

  readonly updateTodoStatus = this.updater((state, update: { id: string; isDone: boolean }) => ({
    ...state,
    todo: state.todo.map(todo =>
      todo.id === update.id ? { ...todo, isDone: update.isDone } : todo),
    finishedList: state.finishedList.map(todo =>
      todo.id === update.id ? { ...todo, isDone: update.isDone } : todo),
  }))

  readonly removeTodo = this.updater((state, id: string) => ({
    ...state,
    todo: state.todo.filter(todo => todo.id !== id),
    finishedList: state.finishedList.filter(todo => todo.id !== id),
  }));


  //effects
  readonly loadTodoEffect = this.effect<string>((uid$) => {
    return uid$.pipe(
      switchMap(uid =>
        this.todoService.getTodosByUid(uid).pipe(
          tap((todos) => {
            const unfinishedTodos = todos.filter(todo => !todo.isDone);
            const finishedTodos = todos.filter(todo => todo.isDone);
            this.loadTodo(unfinishedTodos)
            this.setFinishedList(finishedTodos);
          }),
          catchError(() => of([]))

        )
      )
    )
  })

  readonly addTodoEffect = this.effect<Todo>(newTodo$ => {
    return newTodo$.pipe(
      switchMap(newTodo => this.todoService.addTodo(newTodo.title, newTodo.uid)
        .pipe(
          tap(() => this.addTodo(newTodo)),
          catchError(() => {
            return of(null)
          })
        ))
    )
  })

  readonly updateTodoStatusEffect = this.effect<{ id: string; isDone: boolean }>(update$ => {
    return update$.pipe(
      switchMap(update => this.todoService.updateTodoStatus(update.id, update.isDone)
        .pipe(
          tap(() => this.updateTodoStatus(update)),
          catchError(() => {
            return EMPTY
          })
        ))
    )
  })
  readonly deleteTodoEffect = this.effect<string>(todoId$ => {
    return todoId$.pipe(
      switchMap(id => this.todoService.deleteTodo(id).pipe(
        tap(() => this.removeTodo(id)), // Update the state to remove the todo
        catchError(error => {
          // Handle the error case
          console.error('Error deleting todo:', error);
          return EMPTY; // Use EMPTY to complete the observable sequence
        })
      ))
    );
  });



// Call this method to trigger the loadTodosEffect effect
loadTodos(uid: string) {
  // This should trigger the effect and not return anything
  this.loadTodoEffect(uid);
}
}