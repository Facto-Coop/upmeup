import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get('http://localhost:3000/users');
  }

  getUser() {
    /*this.httpClient.get('http://localhost:3000/users').subscribe((data: {}) => {
      this.employeeData = data;
    });*/

    /*this.restApi.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data;
    })*/
  }
}
