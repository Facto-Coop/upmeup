import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { SoftskillsService } from 'src/app/services/softskills.service';
import { UserService } from 'src/app/services/user.service';
import { ValuesModalPage } from '../../shared/modals/values-modal/values-modal.page';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePage implements OnInit {
  userName = localStorage.getItem('user');
  userID = localStorage.getItem('userid');
  userInfo: any[] = [];
  userSkills: any[] = [];

  constructor(private modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private uService: UserService,
              private softSkillService: SoftskillsService
  ) { }

  ngOnInit() {
    this.qGetUser(this.userID);
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
      this.getUserSkills(item.getUser.valors);
    });
  }

  /** Get ID Skills from User */
  getUserSkills(uValues){
    uValues.forEach(el => {
      console.log(el);
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
      this.useLocalstorage(this.userSkills);
    });
  }

  useLocalstorage(skills) {
    localStorage.setItem('uSelectedSkills', JSON.stringify(skills));
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ValuesModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
}
