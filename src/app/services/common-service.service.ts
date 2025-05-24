import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  ids:BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() { }

  getId(){
    return this.ids;
  }

  setId(id:string){
    this.ids.next(id)
  }
}
