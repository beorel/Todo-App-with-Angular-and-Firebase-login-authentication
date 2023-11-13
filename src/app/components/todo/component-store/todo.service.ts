import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { Todo } from './todo.models';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection;

  //interacting with the firebase todo to get info.
  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection<Todo>('todos')
  }

  // Method to retrieve all todos
  // getTodos(): Observable<Todo[]> {
  //   // Use the valueC hanges() method to get the data and the ID of the document
  //   return this.firestoreCollection.valueChanges({ idField: 'id' });
  // }

  getTodos(): Observable<Todo[]> {
    //The firestore.collection<Todo>('todos') tells AngularFirestore to treat documents in the todos collection as having the type Todo.
    //The valueChanges({ idField: 'id' }) method returns an observable that emits the array of documents, each with an id property added.
    return this.firestoreCollection.valueChanges({ idField: 'id' }).pipe(
      map((documents: DocumentData[]) => {
//The map RxJS operator is then used to map over each document, casting it to the Todo type and preserving the id field
        return documents.map(doc => {
          // Cast the document to the Todo type
          return {

            ...doc as Todo
          };
        });
      })
    );
  }

  getTodosByUid(uid: string): Observable<Todo[]> {
    // Create a reference to the filtered collection
    const filteredCollection = this.firestore.collection<Todo>('todos', ref =>
      ref.where('uid', '==', uid)
    );

    // Return the observable of the filtered todo items including the document ID
    return filteredCollection.valueChanges({ idField: 'id' });
  }
  //picks the information of the input and set the status to false if its not done
  addTodo(title: string, uid: string): Observable<DocumentReference> {
    return from(this.firestoreCollection.add({
      title,
      isDone: false,
      uid
    }))
  }

  //it picks up and id then update the status by checking if isDone is true or false
  updateTodoStatus(id: string, newStatus: boolean): Observable<void>{
    return from(this.firestoreCollection.doc(id).update({ isDone: newStatus }))
  }

  deleteTodo(id: string): Observable<void> {
    return from(this.firestoreCollection.doc(id).delete());
  }
}
