import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../entity/item';
import { Observable } from 'rxjs';
import { backendURL } from '../connectionURL/backendURL';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl: string = `${backendURL.springURL}/api`;
  constructor(private http: HttpClient) { }

  getItemList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAll`);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/find/` + id);
  }

  create(item: Item): Observable<any> {
    return this.http.post(`${this.baseUrl}/store`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/item/` + id);
  }

}
