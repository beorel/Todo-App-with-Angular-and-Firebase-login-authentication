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
