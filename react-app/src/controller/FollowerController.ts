import type { Follow } from "../model/Follow.ts" ;

export class FollowerController {
  follow(follow : Follow) {
    return this.model.createFollower(follow) ;
  }

  /*unfollow(followId : number) {
    return this.model.deleteFollow(followId) ;
  }*/

  deletefollow(index :number) {
    return this.model.deleteEventIndex(index) ;
  }
}