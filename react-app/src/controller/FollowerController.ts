import type { Follow } from "../model/Follow.ts";
import { ModelServicesFollow } from "../model/service/ServicesFollow.ts";


export class FollowerController {
  private model: ModelServicesFollow;
  constructor() {
    this.model = new ModelServicesFollow();
  }

  follow(follow: Follow) {
    return this.model.createFollower(follow);
  }

  /*unfollow(followId : number) {
    return this.model.deleteFollow(followId) ;
  }*/

  deletefollow(index: number) {
    return this.model.deleteFollowIndex(index);
  }
}