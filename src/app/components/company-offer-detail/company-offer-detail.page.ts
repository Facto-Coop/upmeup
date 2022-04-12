import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_USOFRS = gql`
  query {
    getUsersOffers {
      _id
      offer_id
      user_id
    }
  }
`;

const GET_UINFO = gql`
  query getUserInfo($id: String!){
    getUser(id: $id) {
      _id
      name 
      email
      valors
    }
  }
`;

const GET_SKILLNAME = gql`
  query getSkillsInfo($id: String!){
    getSkill(id: $id) {
      _id
      name 
    }
  }
`;

@Component({
  selector: 'app-company-offer-detail',
  templateUrl: './company-offer-detail.page.html',
  styleUrls: ['./company-offer-detail.page.scss'],
})
export class CompanyOfferDetailPage implements OnInit {
  offerID: any;
  userOfferList: any[] = [];
  usersListData: any[] = [];
  error: any;
  loading = true;
  enrolledUser: any[] = [];
  uSkills: any[] = [];

  private querySubscription: Subscription;

  constructor(private aRoute: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.qUsersOffers();
  }

  /**
   * Call Query to Get users by offers.
   *  */
  qUsersOffers() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_USOFRS
    }).valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.userOfferList = data.getUsersOffers;
        this.error = data.errors;
        this.getUsersId();
    });
  }

  /**
   * Function to get list of users enrolled in the offer.
   *  */
  getUsersId() {
    this.offerID = this.aRoute.snapshot.params.id;

    this.userOfferList.forEach(item => {
      if(item.offer_id === this.offerID) {
        this.enrolledUser.push(item);
      }
    });

    this.getUsersById(this.enrolledUser);
  }

  /**
   * Function to get ID's of each user enrolled.
   *  */
  getUsersById(eUsers) {
    eUsers.forEach(item => {
      this.qUsersInfo(item.user_id);
    });
  }

  /**
   * Call Query to Get info of each user (by ID).
   *  */
  qUsersInfo(userId: string) {
    this.querySubscription = this.apollo.watchQuery({
      query: GET_UINFO,
      variables: {
        id: userId,
      },
    }).valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        this.usersListData.push(result.data.getUser);
        const skillsArray = result.data.getUser.valors;

        this.getSkillsById(userId, skillsArray);
    });
  }

  /**
  * Function to call softSkills of each user enrolled.
  *  */
  getSkillsById(userId, skills) {
    skills.forEach(element => {
      this.qSkillName(userId, element);
    });
  }

  /**
   * Call query to get name of each user-skill.
  * */
  qSkillName(userId, skillId: string) {
    this.querySubscription = this.apollo.watchQuery({
      query: GET_SKILLNAME,
      variables: {
        id: skillId,
      },
    }).valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        const skill = result.data.getSkill;
        const idBySkill = { userId, skill };
        this.uSkills.push(idBySkill);
    });
  }
}
