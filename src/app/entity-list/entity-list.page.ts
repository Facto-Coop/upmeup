import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from '../models/entity';
import { EntityService } from '../services/entity.service';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.page.html',
  styleUrls: ['./entity-list.page.scss'],
})
export class EntityListPage implements OnInit {
  entities: Entity[];
  img = 0;
  private topLimit = 15;
  private entityList: any = [];

  constructor(private router: Router, private entityService: EntityService) { }

  ngOnInit() {
    this.entities = this.entityService.getEntities();
    this.entityList = this.entities.slice(0, this.topLimit);
  }

  doInfinite(e) {
    setTimeout(() => {
      this.topLimit += 10;
      this.entityList = this.entities.slice(0, this.topLimit);
      e.target.complete();

      if (this.entityList.length == this.entities.length){
        e.target.disabled = true;
      }

    }, 500);
  }

}
