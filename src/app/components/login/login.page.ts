import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  email: string;
  password: string;
  userType = '0';
  userExist = false;

  constructor(private usService: UserService, private apollo: Apollo, public fBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
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
            name
            email
            password
            tipo
          }
        }
      `,
    }).valueChanges.subscribe((result: ApolloQueryResult<any> ) => {

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
      this.email = this.initForm.value.userEmail;
      this.password = this.initForm.value.userPassword;

      this.goToPage(this.email, this.password);
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get errorControl() {
    return this.initForm.controls;
  }

  // Check if input has email
  goToPage(uEmail, uPassword) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.users.length; i++) {
      const el = this.users[i];
      if(uEmail === el.email && uPassword === el.password) {
        // alert('Adelante...!');
        this.userExist = true;
        this.userType = el.tipo;
        // console.log(this.userType);
        if(this.userType === '1'){
          this.router.navigate(['/offer-list']);
        } else if(this.userType === '2') {
          this.router.navigate(['/company-profile']);
        }
        return;
      }
    }

    // TODO: Control de errores.
    if(this.userExist === false) {
      console.log('Usuario y/o contraseña no son correctos.');
    }

  }



}
