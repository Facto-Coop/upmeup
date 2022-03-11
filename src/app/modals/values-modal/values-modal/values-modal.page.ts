import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-values-modal',
  templateUrl: './values-modal.page.html',
  styleUrls: ['./values-modal.page.scss'],
})
export class ValuesModalPage implements OnInit {
  ecoVal = 0;
  igualdadVal = 0;
  transparenciaVal = 0;
  proactividadVal = 0;
  iSocialVal = 0;
  oParticipativaVal = 0;

  constructor() { }

  ngOnInit() {
  }

  public customFormatter(value: number) {
    // console.log(value);

    return `${value}`;
  }

  public values() {
    //this.ecoVal;
  }

}
