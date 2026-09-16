import { follows } from "../../DB/followdata.ts";
import type { Follow } from "../Follow";

export class ModelServicesFollow{
  createFollower(follow : Follow) {
    follows.push(follow) ;
  }

  deleteFollowIndex(index : number){
    follows.splice(index, 1);
  }  
}