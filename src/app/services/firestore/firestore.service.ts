import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData,addDoc,setDoc,doc,updateDoc } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  // Method to load data from Firestore
  loadData(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' });
  }
  async addData(collectionName: string, data: any): Promise<void> { 
    const collectionRef = collection(this.firestore, collectionName);
    await addDoc(collectionRef, data);
  } 
  async updateData(collectionName: string, id: string, data: any): Promise<void> {
    const collectionRef = collection(this.firestore, collectionName);
    await  updateDoc(doc(collectionRef, id), data);
  }

  async deleteData(collectionName: string, id: string): Promise<void> {
    const collectionRef = collection(this.firestore, collectionName);
    const fbDoc = doc(this.firestore,collectionRef + id);
    await deleteDoc(fbDoc);
  }
}
