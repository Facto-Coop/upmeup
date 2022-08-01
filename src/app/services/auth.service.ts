/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  private _isLoggedIn = new BehaviorSubject(false);
  userType = '0';

  constructor(private router: Router,
              private usService: UserService,
              ) { }


  //TODO: Implement CanLoad to avoid a module to be loaded without Logging In.
  canLoad(route: Route): boolean {
    if (this.isLogged()) {
      return true;
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isLogged(){
    return this._isLoggedIn.value;
  }

  /*async validateUser(userID: string, pass: string): Promise<any> {
      const user = await this.usService.qValidateUser(userID).valueChanges.pipe(
        map(result => result.data)
      ).subscribe((item) => {
        console.log(item.getUser);
      });

     /* console.log(user);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }*/
  //}

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  onLogin() {
    this._isLoggedIn.next(true);
  }

  //LogOut app
  async onLogout() {
    // this.authToken = null;
    await sessionStorage.clear();
    this._isLoggedIn.next(false);
    window.location.assign('/');
  }

}
