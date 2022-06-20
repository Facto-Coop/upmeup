import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { SoftskillsService } from 'src/app/services/softskills.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { ValuesModalPage } from '../../shared/modals/values-modal/values-modal.page';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userName = sessionStorage.getItem('user');
  userID = sessionStorage.getItem('userid');
  skillsList: any[] = []; //JSON.parse(sessionStorage.getItem('uSelectedSkills'));
  userInfo: any[] = [];
  userSkills: any[] = [];

  constructor(private modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private uService: UserService,
              private softSkillService: SoftskillsService,
              private auth: AuthService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.qGetUser(this.userID);
    // TODO: Get info from user in DB.
    this.skillsList = JSON.parse(sessionStorage.getItem('uSelectedSkills'));
  }

  /**
   * Get User info from DB
   * @param userId
   */
  qGetUser(userId: string) {
    this.uService.qGetUser(userId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      // console.log(item);
      this.userInfo = item.getUser;
      /*this.userInfo.forEach((el) => {
        this.qSkillName(el.valors);
      });*/
      this.getUserSkills(item.getUser.valors);
    });
  }

  /** Get ID Skills from User */
  getUserSkills(uValues){
    uValues.forEach(el => {
      //console.log(el);
      this.qSkillName(el);
    });
  }

  /** Get SkillNames */
  qSkillName(skillId: string) {
    this.userSkills = [];
    this.softSkillService.qGetSkill(skillId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.userSkills.push(item.getSkill);
      console.log('skills: ' + this.userSkills);
      this.useSessionStorage(this.userSkills);
    });
  }

  useSessionStorage(skills) {
    sessionStorage.setItem('uSelectedSkills', JSON.stringify(skills));
  }

  logOut() {
    this.auth.onLogout();
    this.router.navigate(['/login']);
  }

  /**
   * Call modal to change values from profile.
   * @returns
   */
  async openModal() {
    const modal = await this.modalController.create({
      component: ValuesModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

}
