import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection;

  //interacting with the firebase todo to get info.
  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('todos')
  }

  //picks the information of the input and set the status to false if its not done
  addTodo(title: string, userID: string) {
    this.firestoreCollection.add({
      title,
      isDone: false,
      uid: userID // Add the user's UID to the document
    });
  }

  //it picks up and id then update the status by checking if isDone is true or false
  updateTodoStatus(id:string, newStatus:boolean){
    this.firestoreCollection.doc(id).update({isDone:newStatus})
  }

  deleteTodo(id:string){
    this.firestoreCollection.doc(id).delete();
  }
}
