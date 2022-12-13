/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { SoftskillsService } from 'src/app/services/softskills.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-values-modal',
  templateUrl: './values-modal.page.html',
  styleUrls: ['./values-modal.page.scss'],
})
export class ValuesModalPage implements OnInit, OnDestroy {
  skillsList: any[] = [];
  maxElementCheckbox = 6;
  skillsSelected: any[] = [];
  currentModal = null;
  userID = sessionStorage.getItem('userid');
  skillsIds: any[] = [];
  userSkills: any[] = [];
  selected = 0;
  selectedSkills: any[] = [];

  @Output()
  sendSelectedSkills: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalController: ModalController,
              private softSkillService: SoftskillsService,
              private uService: UserService) { }

  ngOnInit() {
    this.qsoftSkillsQuery();
    this.userSkills = JSON.parse(sessionStorage.getItem('uSelectedSkills'));
  }

  /**
   * Get softSkills from DB.
   */
  qsoftSkillsQuery() {
    this.softSkillService.qGetAllSkills().valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.skillsList = item.getSoftskills;
    });
  }

  saveSkills() {
    this.useSessionStorage(this.skillsSelected);
    this.skillsSelected.forEach(element => {
      this.sendSelectedSkills.emit(element);
      const elementID: string = element._id;
      this.skillsIds.push(elementID);
    });
    this.mEditUserSkills(this.skillsIds);
  }

  /**
   * Save new values for "Skills"
   * @param skills
   */
  mEditUserSkills(skillsList: string[]) {
    if(this.userID) {
      this.uService.mUserSkillUpdate(this.userID, skillsList)
      .subscribe((response) => {
        console.log('Edition Done!');
      });
    }

    this.dismissEditModal(this.skillsSelected);
  }

  /**
  * Close modal when update
  */
  async dismissEditModal(data) {
    this.modalController.dismiss(data);
  }

  /**
   * Selection of skills
   * @param $event 
   * @param item 
   */
  changeSelection(event, item) {
      if (event.target.checked) {
        this.skillsSelected.push(item);
      } else {
        this.skillsSelected.splice(this.skillsSelected.indexOf(item), 1);
      }
  }

  disableCheckbox(id): boolean {
    return (
      this.skillsSelected.length >= this.maxElementCheckbox &&
      this.skillsSelected.indexOf(id) == -1
    );
  }

  /**
   * Use LocalStogare for save an array of selected skills
   * @param uSkills 
   */
  useSessionStorage(uSkills) {
    sessionStorage.setItem('uSelectedSkills', JSON.stringify(uSkills));
  }

  /** Modal functions if "button back" is clicked */
  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }

}

