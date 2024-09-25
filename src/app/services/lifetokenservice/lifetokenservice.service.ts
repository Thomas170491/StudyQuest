import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LifetokenserviceService {
  private lifetokensSubject: BehaviorSubject<number> = new BehaviorSubject<number>(5)
  constructor(
    //private readoly exerciseService: ExerciseService,
    
  ) { }
  getlifetokens(){
    return this.lifetokensSubject.asObservable();
  }
  setlifetokens(lifetokens: number){
    this.lifetokensSubject.next(lifetokens);
  }
  incrementLifetokens(){
    this.lifetokensSubject.next(this.lifetokensSubject.value + 1);
  }
  decrementLifetokens(){
    this.lifetokensSubject.next(this.lifetokensSubject.value - 1);
  }

}
