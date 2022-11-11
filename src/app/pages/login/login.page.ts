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
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users: any[];
  userData: any = '';
  error: any = '';
  // loading = true;
  initForm: FormGroup;
  isSubmitted = false;
  emailRegex = '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/';

  user = { email: '', pw: ''};
  //email: string;
  //password: string;
  userType = '0';
  userExist = false;
  roleMsg = '';

  constructor(private menu: MenuController,
              private uService: UserService,
              private apollo: Apollo,
              public fBuilder: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private auth: AuthService,
              private appC: AppComponent,
              public loadingCtrl: LoadingController,) {  }

  ngOnInit() {
    this.menu.enable(false);
    this.validation();
    this.userQuery();
    this.initForm.reset();
    //this.qUserLog();
  }

  //TODO: Refactor Login!!!!!
  // Get info from DB.
  userQuery() {
    this.apollo.watchQuery({
      query: gql`
        {
          getUsersData {
            _id
            name
            email
            password
            tipo
            valors
          }
        }
      `,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>) => {

      this.users = result.data && result.data.getUsersData;
      //this.loading = result.loading;
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

    if (this.initForm.valid) {
     /* this.loadingCtrl.create({
        message: 'Autenticando usuario...',
        duration: 700
      }).then(async res => {
        res.present();
        this.loadingCtrl.dismiss();*/
        //console.log(this.initForm.value.userEmail);
        this.user.email = this.initForm.value.userEmail;
        this.user.pw = this.initForm.value.userPassword;
      //});
     
      this.loginIn(this.user.email, this.user.pw);
    }

    return false;
  }

  qUserLog() {
    /*this.uService.qGetUsersLog().valueChanges.pipe(
      map(result => {
        this.users = result.data.getUsers;
      })
    ).subscribe((item) => {
      this.findUser(this.initForm.value.userEmail);
    });*/

   /* this.uService.qGetUsersLog().valueChanges
      .subscribe((result: any) => {
        this.users = result?.data?.items;
      });*/
  }

  findUser(mail) {
    const index = this.users.findIndex(
      object => object.email === mail
    );

    if(index === -1) {
      console.log('No se encuentra usuario!');
    } else {
      this.userData.push(this.users[index]);
    }

    console.log('ID Compets that need to User Profile --> ', this.userData);
  }

  // Check if user exist
  loginIn(uEmail, uPassword) {
    if(this.users.length) {
      for (let i = 0; i < this.users.length; i++) {
        const el = this.users[i];
        // TODO: Refactor --> encrypt passw.
        if(uEmail === el.email && uPassword === el.password) {
          this.userExist = true;
          this.useSessionStorage(el._id, el.name, el.email, el.valors);
          this.auth.onLogin();
          this.userType = el.tipo;

          //TODO: Cambiar este "parche" para cambio de menu!!
          this.appC.logginMenu(this.userType, el.name);

          if (window.sessionStorage) {
            sessionStorage.removeItem('uSelectedSkills');
          }

          // Show one menu or another.
          if(this.userType === '1'){
            this.router.navigate(['/user-profile']);
          } else if(this.userType === '2') {
            this.router.navigate(['/company-profile']);
          }

          this.menu.enable(true);

          return;
        }
      }
    } else {
      console.log('Parece que hubo un error... :( ');
    }

    // TODO: Control de errores.
    if(this.userExist === false) {
      console.log('Usuario y/o contraseña no son correctos.');
    }
  }

  get errorControl() {
    return this.initForm.controls;
  }

  useSessionStorage(uid, uName, uMail, uSkills) {
    sessionStorage.setItem('userid', uid);
    sessionStorage.setItem('user', uName);
    sessionStorage.setItem('email', uMail);
    sessionStorage.setItem('uSelectedSkills', uSkills);
  }

  // Popup to install app:
  /*async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vols instal·lar Up me Up al teu mòbil?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'D\'Acord',
          role: 'confirm'
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMsg = `Dismissed with role: ${role}`;
  }*/


  alertMail() {
    alert('Ponte en contacto con: lmata@facto.cat');
  }

}
