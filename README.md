errors faced after importing firebase:
1.
export interface DocumentChange<T> extends firebase.firestore.DocumentChange {
                                       ~
    This type parameter might need an `extends firebase.firestore.DocumentData` constraint.

solution: so i updated it to -
export interface DocumentChange<T> extends firebase.firestore.DocumentChange<T>
