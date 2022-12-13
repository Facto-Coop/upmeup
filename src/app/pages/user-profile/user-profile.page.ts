import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { CompetenceService } from 'src/app/services/competence.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { SoftskillsService } from 'src/app/services/softskills.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { ValuesModalPage } from '../../shared/modals/values-modal/values-modal.page';
import { EditUserPage } from '../edit-user/edit-user.page';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userID = sessionStorage.getItem('userid');
  skillsList: any[] = [];
  userInfo: User;
  userSkills: any[] = [];
  skillsName: any;
  skillsIco: any[] = [];
  compet: any;
  userCompets: any[] = [];
  sectorName = '';

  constructor(
              private modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private uService: UserService,
              private softSkillService: SoftskillsService,
              private sectorService: SectorsService,
              private competService: CompetenceService,
              private auth: AuthService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.qGetUser(this.userID);
    this.skillsList = JSON.parse(sessionStorage.getItem('uSelectedSkills'));
  }

  /**
   * Get User info from DB
   * @param userId
   */
  qGetUser(userId: any) {
    this.uService.qGetUser(userId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      if(!item) {
        console.log('Ops, sembla que no hi han dades que mostrar....');
      } else {
        this.userInfo = item.getUser;
      }
      this.getUserSkills(item.getUser.valors);
      this.qGetSectorName(item.getUser.sector_id);
      this.getUserCompets(item.getUser.competencies);
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
    this.skillsIco = [];
    this.softSkillService.qGetSkill(skillId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.userSkills.push(item.getSkill);
      const nameClass = item.getSkill.name.replace(/ /g, '_');
      this.skillsName = nameClass.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      this.skillsIco.push({
        sid: item.getSkill._id,
        sname: item.getSkill.name,
        sClass: this.skillsName
      });

      this.useSessionStorage(this.userSkills);
    });
  }

  /** Get ID Competence from User */
  getUserCompets(uCompets){
    uCompets.forEach(el => {
      this.qGetCompetencies(el);
    });
  }

  // Get Competences data from DB
  qGetCompetencies(competId) {
    this.userCompets = [];
    this.competService.qGetCompetence(competId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.userCompets.push(item.getCompetence);
    });
  }

  // Get sector
  qGetSectorName(sectorId) {
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
