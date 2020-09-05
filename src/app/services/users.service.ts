import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://jsonplaceholder.typicode.com/users';

  get() {
    return this.http.get(this.baseUrl);
  }

}
