errors faced after importing firebase:
1.
export interface DocumentChange<T> extends firebase.firestore.DocumentChange {
                                       ~
    This type parameter might need an `extends firebase.firestore.DocumentData` constraint.

solution: so i updated it to -
export interface DocumentChange<T> extends firebase.firestore.DocumentChange<T>


after git cloning-
npm install
npm i @angular/fire
npm install firebase @angular/fire

errors of seeing - export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot {
                                      ~
    This type parameter might need an `extends firebase.firestore.DocumentData` constraint.

solution- export interface DocumentChange<T> extends firebase.firestore.DocumentChange<T> {
    readonly doc: QueryDocumentSnapshot<T>;
}
NOTE- ADD <T> after the end of documentchnage



----
1. component reading and writing into the ngrx component store
  1. reading the todo items
  2. writing added tasks (update)
  CRUD - COMPONENT performing crud operation3 on the storE
  - anytime the task is added it should be able to update firebase
2. create save button
3. then component store updates firebase with the save button


