import { inject, Injectable } from "@angular/core";
import { Firestore, doc, deleteDoc, getDoc, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { from, Observable } from "rxjs";
import { type User } from "./user/user.model";
import { type ActionPoints } from "./action-points/action-points.model";

@Injectable({providedIn: 'root'})

export class FirestoreService {

  firestore = inject(Firestore);
  apCollection = collection(this.firestore, 'actionPoints');

  //Collection Manipulation
  removeDocument(collectionName: string, id:string): Observable<void> {
    const docRef = doc(this.firestore, collectionName+id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  getDocument(docReference: string): Observable<any> {
    const docRef = doc(this.firestore, docReference);
    return from(getDoc(docRef));
  }

  async addPlayerAP(user: User): Promise<string> {
    try {
      const myRecord: ActionPoints = {
        user: user,
        apGenerated: 0,
        apUsed: 0
      }

      const docRef = await addDoc(this.apCollection, myRecord);
      return docRef.id;
    } catch(error) {
      console.error("Error Adding AP Record: ",error);
      throw new Error("Failed to fully add user");
    }
  }

  getPlayerAPs(): Observable<ActionPoints[]> {
    return collectionData(this.apCollection) as Observable<ActionPoints[]>;
  }


}
