import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { SectorsService } from 'src/app/services/sectors.service';
import { SoftskillsService } from 'src/app/services/softskills.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { ValuesModalPage } from '../../shared/modals/values-modal/values-modal.page';
import { EditUserPage } from '../edit-user/edit-user.page';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePage implements OnInit {
  userName = sessionStorage.getItem('user');
  userID = sessionStorage.getItem('userid');
  userInfo: any[] = [];
  userSkills: any[] = [];
  sectorName = '';

  constructor(private modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private uService: UserService,
              private softSkillService: SoftskillsService,
              private auth: AuthService,
              private sectorService: SectorsService,
              private router: Router,
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
      this.qGetSectorName(item.getUser.sector_id);
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
      //console.log('skills: ' + this.userSkills);
      this.useSessionStorage(this.userSkills);
    });
  }

  qGetSectorName(sectorId) {
    //let sectorName = '';
    this.sectorService.qGetSector(sectorId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.sectorName = item.getSector.name;
    });
  }

  useSessionStorage(skills) {
    sessionStorage.setItem('uSelectedSkills', JSON.stringify(skills));
  }

  logOut() {
    this.auth.onLogout();
    this.router.navigate(['/login']);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ValuesModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  /**
  * Call modal to edit user profile
  */
  async editModal() {
    const editModal = await this.modalController.create({
      component: EditUserPage,
      componentProps: {
        userData: this.userInfo
      },
      animated: true,
      cssClass: 'modalCss'
    });
    await editModal.present();
  }
}
