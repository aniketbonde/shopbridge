import { Injectable } from '@angular/core';
import { Item } from '../entity/item';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  data : Item
  check : String
  constructor() { }

  setData(element){
    this.data = element;
  }

  getData(){
    return this.data;
  }

  setCheck(check){
    this.check = check;
  }

  getCheck(){
    return this.check;
  }

}
