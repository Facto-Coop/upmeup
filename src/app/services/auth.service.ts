import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  private _isLoggedIn = new BehaviorSubject(false);
  userType = '0';

  constructor(private router: Router,) {
    // this.loadUser();
  }

  /*signIn(): Observable<any> {
    this.onLogin();
  }*/

  onLogin() {
    this._isLoggedIn.next(true);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }


  //LogOut app
  async onLogout() {
    // this.authToken = null;
    await localStorage.clear();
    this._isLoggedIn.next(false);
  }


  //TODO: Carga usuario
  /*loadUser() {
    // console.log('cargo usuario desde aquí');
  }*/

  //TODO: Get user observable?

}
