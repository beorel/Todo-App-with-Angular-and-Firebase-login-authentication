import { Injectable } from "@angular/core";
import { Todo } from "./todo.model";
import { ComponentStore } from "@ngrx/component-store";



export interface TodoState{
  todo: Todo
}

@Injectable({ providedIn: 'root' })

export class TodoStore extends ComponentStore<TodoState>{
constructor(){
  super({ todo: {} as Todo })
}
}

