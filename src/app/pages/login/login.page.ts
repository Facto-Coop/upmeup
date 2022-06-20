/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users: any[];
  error: any;
  loading = true;
  initForm: FormGroup;
  isSubmitted = false;
  emailRegex = '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/';

  user = { email: '', pw: ''};
  //email: string;
  //password: string;
  userType = '0';
  userExist = false;

  constructor(private menu: MenuController,
              private apollo: Apollo,
              public fBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private appC: AppComponent) { }

  ngOnInit() {
    this.menu.enable(false);
    this.validation();
    this.userQuery();
  }

  // Get info from DB.
  userQuery() {
    this.apollo
    .watchQuery({
      query: gql`
        {
          getUsers {
            _id
            name
            email
            password
            tipo
          }
        }
      `,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>) => {

      this.users = result.data && result.data.getUsers;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }

  validation() {
    this.initForm = this.fBuilder.group({
      userEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      userPassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submitForm() {
    this.userType = '0';
    this.userExist = false;
    this.isSubmitted = true;
    if (!this.initForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.initForm.value.userEmail);
      this.user.email = this.initForm.value.userEmail;
      this.user.pw = this.initForm.value.userPassword;

      this.loginIn(this.user.email, this.user.pw);
    }
  }

  get errorControl() {
    return this.initForm.controls;
  }

  // Check if input has email
  loginIn(uEmail, uPassword) {
    for (let i = 0; i < this.users.length; i++) {
      const el = this.users[i];
      if(uEmail === el.email && uPassword === el.password) {
        this.userExist = true;
        this.useSessionStorage(el._id, el.name, el.email);
        this.auth.onLogin();
        this.userType = el.tipo;

        //TODO: Cambiar este "parche" para cambio de menu!!! (Auth)
        this.appC.logginMenu(this.userType, el.name);

        if (window.sessionStorage) {
          sessionStorage.removeItem('uSelectedSkills');
        }

        if(this.userType === '1'){
          this.router.navigate(['/user-profile']);
        } else if(this.userType === '2') {
          this.router.navigate(['/company-profile']);
        }

        this.menu.enable(true);

        return;
      }
    }

    // TODO: Control de errores.
    if(this.userExist === false) {
      console.log('Usuario y/o contraseña no son correctos.');
    }
  }

  useSessionStorage(uid, uName, uMail) {
    sessionStorage.setItem('userid', uid);
    sessionStorage.setItem('user', uName);
    sessionStorage.setItem('email', uMail);
  }

}
